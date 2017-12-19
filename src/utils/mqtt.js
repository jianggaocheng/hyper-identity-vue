import mqtt from 'mqtt';
import { EventEmitter } from 'events';

let topicList = [];

const MQTT_ACTION = {
    DR: 0,
    DC: 1,
    CFG: 2,
    DRCFG: 3
}

const ACTION_TYPE = {
    STATUS: 'C0',
    CONFIG: 'C1'
}

const CTRL_KEY = {
    PowerSet: 0,
    OperationalMode: 1,
    SilentMode: 2,
    FaultReset: 3,
}

const TIME_KEY = {
    Month: 0,
    Day: 1,
    Hour: 2,
    Minute: 3
}

const CFG_KEY = {
    SetTemp_Cool_WaterIN: 0,
    SetTemp_Heat_WaterIN: 1,
    SetTemp_Cool_WaterOUT: 2,
    SetTemp_Heat_WaterOUT: 3,
    Cooling_WaterCtrl: 4,
    Heating_WaterCtrl: 5,
    CtrlCycle: 6,
    SetTemp_WaterAction: 7
}

const POWER = {
    OFF: 0,
    ON: 1
}

const MODE = {
    COLD: 0,
    HEAT: 1,
    COLD_QUICK_HEAT: 2,
    HEAT_QUICK_COLD: 3,
    COLD_PLAIN_HEAT: 4,
    HEAT_PLAIN_HEAT: 5,
    QUICK_HEAT: 6,
    PLAIN_HEAT: 7,
    LOOP: 8,
}

const CONNEC_STATUS = {
    OFF: 0,
    ON: 1
}

const EXCP_STATUS = {
    OK: 0,
    EXCEPTION: 1
}

// const TOPIC_DATA = `/MAC/${MAC}/DA`;
// const TOPIC_CTRL = `/MAC/${MAC}/DC`;
// const TOPIC_CFG = `/MAC/${MAC}/CFG`;
// const TOPIC_DR = `/MAC/${MAC}/DR`;
// const TOPIC_ERROR = `/MAC/${MAC}/ERROR`;
// const TOPIC_ACK = `/MAC/${MAC}/ACK`;

let client;
let eventEmitter = new EventEmitter();

function getRandomCharByLen(byteLen = 1) {
    return '0'.repeat(byteLen * 2)
        .replace(/0/g, function () {
            return (0 | Math.random() * 16).toString(16).toUpperCase();
        })
}
function seq(len) {
    return Array.apply(null, { length: len }).map(Function.call, Number);
}
function ensureBytes(data, len, dir = 'left') {
    data = data || '';
    let bitsLen = len * 2;
    let paddingLen = bitsLen - data.toString().length;
    if (dir === 'left') {
        return new Array(paddingLen + 1).join('0') + data;
    }
    return data + new Array(paddingLen + 1).join('0');
}
function tempTo16Hex(temp) {
    return (temp * 10).toString(16);
}
/**
 * 
 * 将温度值转换为“小端”格式
 * 例如： 转换40.0度
 * 1. 乘以10然后用16进制表示: 190
 * 2. 按两字节拆分， 不足在低位补0: 01 90
 * 3. 交换高位和地位字节： 90 01
 * @export
*/
function temp2Internal(temp, isReverse) {
    // 反向转换
    if (isReverse) {
        return parseInt(temp.slice(2, 4) + temp.slice(0, 2), 16) / 10;
    }
    let hexValue = ensureBytes(tempTo16Hex(temp), 2);
    return hexValue.slice(2, 4) + hexValue.slice(0, 2);
}

function composeMQTTPayload(config) {
    let payload = '';
    let HEADER = 48;
    let TAIL = 54;
    let deviceType = 'D0';
    let action = config.action;
    let MAC = config.MAC;

    switch (action) {
        //”’H’(1Byte)+Dev_Type(0xD0,1Byte)+Dev_ID(8Byte)+’T’(1Byte)
        case MQTT_ACTION.DR:
            payload = [HEADER, deviceType, ACTION_TYPE.STATUS, MAC, TAIL].join('');
            break;
        case MQTT_ACTION.DRCFG:
            payload = [HEADER, deviceType, ACTION_TYPE.CONFIG, MAC, TAIL].join('');
            break;
        case MQTT_ACTION.DC:
            //”’H’(1Byte)+Dev_Type(0xD0,1Byte)+Dev_ID(8Byte)+YORK_MASTER_CTRL_CMD_TYPEDEF(4Byte)+EXEC_DATE_TYPEDEF(4Byte)+’T’(1Byte 
            payload = [
                HEADER,
                deviceType,
                MAC,
                ensureBytes(config[CTRL_KEY.PowerSet], 1),
                ensureBytes(config[CTRL_KEY.OperationalMode], 1),
                ensureBytes(config[CTRL_KEY.SilentMode], 1),
                ensureBytes(config[CTRL_KEY.FaultReset], 1),
                ensureBytes(config[TIME_KEY.Month], 1),
                ensureBytes(config[TIME_KEY.Day], 1),
                ensureBytes(config[TIME_KEY.Hour], 1),
                ensureBytes(config[TIME_KEY.Minute], 1),
                TAIL
            ].join('');
            break;
        case MQTT_ACTION.CFG:
            //”’H’(1Byte)+Dev_Type(0xD0,1Byte)+Dev_ID(8Byte)+YORK_MASTER_CFG_PARAM_TYPEDEF(14Byte)+’T’(1Byte)
            payload = [
                HEADER,
                deviceType,
                MAC,
                temp2Internal(config[CFG_KEY.SetTemp_Cool_WaterIN]),
                temp2Internal(config[CFG_KEY.SetTemp_Heat_WaterIN]),
                temp2Internal(config[CFG_KEY.SetTemp_Cool_WaterOUT]),
                temp2Internal(config[CFG_KEY.SetTemp_Heat_WaterOUT]),
                ensureBytes(config[CFG_KEY.Heating_WaterCtrl], 1),
                ensureBytes(config[CFG_KEY.Cooling_WaterCtrl], 1),
                ensureBytes(config[CFG_KEY.CtrlCycle], 2),
                temp2Internal(config[CFG_KEY.SetTemp_WaterAction]),
                TAIL
            ].join('');
            break;
        default:
            console.warn(action, ' is not supported!');

    }

    return payload.toUpperCase();
}

function parseBitwise(excp, base) {
    base = base || 0;
    excp = parseInt(excp.slice(2, 4) + excp.slice(0, 2), 16);
    if (excp === 0) {
        return [];
    }
    let matches = [];
    excp.toString(2).replace(/1/g, (match, index) => {
        matches.push(index + base);
    });
    return matches;
}

/**
 * 一共有7个故障字， 每个故障子占两个字节， 小端存储
 */
function exceptionParser(exceptions) {
    if (!exceptions || exceptions.length != 32) {
        return console.warn('故障代码长度必须为16字节！');
    }
    let excp1 = exceptions.slice(0, 4);
    let excp2 = exceptions.slice(4, 8);
    let excp3 = exceptions.slice(8, 12);
    let excp4 = exceptions.slice(12, 16);
    let excp5 = exceptions.slice(16, 20);
    let excp6 = exceptions.slice(20, 24);
    let excp7 = exceptions.slice(24, 28);
    let excp8 = exceptions.slice(28, 32);
    return [excp1, excp2, excp3, excp4, excp5, excp6, excp7, excp8]
        .reduce((prev, curr, index) => prev.concat(parseBitwise(curr, index * 16)), [])
        .map(item => ERRORS[item] || {})
}

function parseStatus(payload) {
    if (!payload || payload.length !== 78) {
        return {
            exception: {
                values: []
            }
        }
    }
    let header = payload.slice(0, 2);
    let type = payload.slice(2, 4);
    let MAC = payload.slice(6, 22);
    let powerStatus = payload.slice(22, 24); // 开关
    /**
     * 0-制冷、1-制热、2-制冷+快速热水、3-制热+快速热水、4-制冷+普通热水、
     * 5-制热+普通热水、6-快速热水、7-普通热水、8-水泵循环
     */
    let mode = payload.slice(24, 26); //模式
    let conn = payload.slice(26, 28); // HMI通信状态
    let tempIn = temp2Internal(payload.slice(28, 32), true);
    let tempOut = temp2Internal(payload.slice(32, 36), true);
    let tempEnv = temp2Internal(payload.slice(36, 40), true);
    /**
     * bit0-15对应模块1-16，1-故障0-正常
     */
    let exception = {
        module: '模块：' + parseInt(payload.slice(42, 44) + payload.slice(40, 42)),
        values: exceptionParser(payload.slice(44, 76))
    };
    let tail = payload.slice(76, 78);
    return {
        header,
        type,
        MAC,
        powerStatus,
        mode,
        conn,
        exception,
        tempIn,
        tempOut,
        tempEnv,
        tail
    }
}
// 48 D0 C1 F0FE6B2F980E0000 0000 0000 0000 0000 00 00 00 00 0000 0000 54
/**
 * 
 * @param payload 
 * 
 */
function parseConfig(payload) {
    if (!payload || payload.length != 56) {
        return {}
    }
    let header = payload.slice(0, 2);
    let type = payload.slice(2, 4);
    let MAC = payload.slice(6, 22);
    let coolTempIn = payload.slice(22, 26);
    let hotTempIn = payload.slice(26, 30);
    let coolTempOut = payload.slice(30, 34);
    let hotTempOut = payload.slice(34, 38);
    let silentMode = payload.slice(38, 40);
    let faultReset = payload.slice(40, 42);
    let coolCtrl = payload.slice(42, 44);
    let hotCtrl = payload.slice(44, 46);
    let ctrlCycle = payload.slice(46, 50);
    let setAction = payload.slice(50, 54);
    let tail = payload.slice(54, 56);
    return {
        type: type,
        config: {
            coldInTemp: temp2Internal(coolTempIn, true),
            coldOutTemp: temp2Internal(coolTempOut, true),
            hotInTemp: temp2Internal(hotTempIn, true),
            hotOutTemp: temp2Internal(hotTempOut, true),
            coldCtrl: parseInt(coolCtrl, 16),
            hotCtrl: parseInt(hotCtrl, 16),
            tempWaterAction: parseInt(setAction, 16)
        }
    }
}

function payloadParser(payload) {
    let actionType = payload.slice(4, 6);
    let result;
    switch (actionType) {
        case ACTION_TYPE.STATUS:
            result = parseStatus(payload);
            break;
        case ACTION_TYPE.CONFIG:
            result = parseConfig(payload);
            break;
    }
    result.actionType = actionType;
    return result;
}

export default {
    eventEmitter,
    MQTT_ACTION,
    ACTION_TYPE,
    POWER,
    composeMQTTPayload,
    payloadParser,
    connect: function () {
        client = mqtt.connect('ws://live.chinabolang.com:3000/mqtt', {
            clientId: 'YORK_BACKEND_' + Math.random().toString(16).substr(2, 8).toUpperCase(),
            keepalive: 30,
            username: 'admin',
            password: 'public',
        });

        client.on('message', function (topic, message) {
            eventEmitter.emit(topic, message.toString());
        });

        topicList = [];
    },
    send: function (topic, payload) {
        client.publish(topic, payload, 1, false);
    },
    subscribe: function (topic, qos, callback) {
        if (topic.indexOf(topicList) == -1) {
            client.subscribe(topic, qos, callback);
            topicList.push(topic);
            console.log('subscribe', topic);
        } else {
            callback();
        }
    },
};