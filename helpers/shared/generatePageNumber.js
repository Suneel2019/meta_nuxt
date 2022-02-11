export default {

  dataTableSerialNumberGenerator(data) {

    data.map((item, index) => {

      item.serial_no = index + 1;

    });

  },

}
