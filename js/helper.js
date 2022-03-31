const getKhoa = () =>
  fetch(`${HOST}/api/khoa/`)
    .then((res) => res.json())
    .then((data) => {
      let html = `<option  value="">Khoa</option>`;
      for (i = 0; i < data.length; i++) {
        elm = data[i];
        html += `<option value="${elm.idKhoa}">${elm.tenKhoa}</option>`;
      }
      document.querySelectorAll("#khoa").forEach((elm) => {
        elm.innerHTML = html;
      });
    })
    .catch((err) => console.log("Error: ", err));

const getKy = () =>
  fetch(`${HOST}/api/kyhoc/`)
    .then((res) => res.json())
    .then((data) => {
      let html = `<option  value="">Kỳ học</option>`;
      for (i = 0; i < data.length; i++) {
        elm = data[i];
        html += `<option value="${elm.idky}">${elm.tenKyHoc}</option>`;
      }
      document.querySelectorAll("#kyHoc").forEach((elm) => {
        elm.innerHTML = html;
      });
    })
    .catch((err) => console.log("Error: ", err));

const getMonHoc = () => {
  fetch(`${HOST}/api/monhoc/`)
    .then((res) => res.json())
    .then((data) => {
      let html = `<option  value="">Môn học</option>`;
      for (i = 0; i < data.length; i++) {
        elm = data[i];
        html += `<option value="${elm.idmh}">${elm.tenMon}</option>`;
      }
      document.querySelectorAll("#monhoc").forEach((elm) => {
        elm.innerHTML = html;
      });
    })
    .catch((err) => console.log("Error: ", err));
};

const getGV = () => {
  fetch(`${HOST}/api/giangvien/`)
    .then((res) => res.json())
    .then((data) => {
      let html = `<option  value="">Giảng viên</option>`;
      for (i = 0; i < data.length; i++) {
        elm = data[i];
        html += `<option value="${elm.idgv}">${elm.tengv}</option>`;
      }
      document.querySelectorAll("#tenGiangVien").forEach((elm) => {
        elm.innerHTML = html;
      });
    })
    .catch((err) => console.log("Error: ", err));
};

const getSinhVien = () => {
  fetch(`${HOST}/api/sinhvien`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      data.forEach((elm) => {
        html += `<option value="${elm.idsv}-${elm.tensv}"/>`;
      });

      document.querySelector("#sinhVien").innerHTML = html;
    })
    .catch((err) => console.log("Error: ", err));
};

// Bảng tin
const renderPGBangTin = () => {
  $(".main").load("../bangtin.html", function () {
    fetch(`${HOST}/api/bangtin`)
      .then((res) => res.json())
      .then((data) => {
        let html = "";
        let i = 1;
        for (i = 0; i < data.length; i++) {
          elm = data[i];
          html += `
      <div class="accordion-item">
    <h2 class="accordion-header" id="heading${i + 1}">
      <button class="accordion-button ${
        i === 0 ? "" : "collapsed"
      }" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${
            i + 1
          }" aria-expanded="${
            i === 0 ? "true" : "false"
          }" aria-controls="collapse${i + 1}">
        Ngày Đăng: ${formatDatetime(elm.thoiGianTao)}
      </button>
    </h2>
    <div id="collapse${i + 1}" class="accordion-collapse collapse${
            i === 0 ? " show" : ""
          }" aria-labelledby="heading${
            i + 1
          }" data-bs-parent="#accordionBangTin">
      <div class="accordion-body">
        ${elm.noiDung}
      </div>
    </div>
  </div>`;
        }
        document.querySelector("#accordionBangTin").innerHTML = html;
      })
      .catch((err) => console.log("Error: ", err));
  });
};
