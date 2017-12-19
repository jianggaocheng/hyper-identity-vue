import moment from "moment";
import { commonGetQuery } from "~/api/resourceApi";

export default {
  formatDate: function(date, format = "YYYY-MM-DD HH:mm") {
    if (!date) {
      return "";
    }
    return moment(date).format(format);
  },

  commonSelectOption: function(modelName, _this, keyProp, valueProp) {
    let array = [];
    return new Promise((resolve, reject) => {
      commonGetQuery(modelName)
        .then(res => {
          let { code, list, errCode, errMsg } = res;

          if (errCode) {
            _this.$message({
              message: errMsg,
              type: "error"
            });
          } else if (code === 200) {
            _.forEach(list, function(item) {
              array.push({
                key: item[keyProp],
                label: item[valueProp],
                value: item[keyProp]
              });
            });

            return resolve(array);
          }
        })
        .catch(err => {
          console.error(err);
          _this.$message({
            message: "未知错误",
            type: "error"
          });
        });
    });
  }
};
