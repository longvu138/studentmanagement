//QUẢN LÝ ĐIỂM
const renderQLDiem = () => {
  $(".main").load("./quanlydiem/");
};

const renderLophocphan = () => {
  $(".main").load("./quanlydiem/lophocphan.html");
};

//QUẢN LÝ LỚP HỌC
const renderQLLophoc = () => {
  $(".main").load("./quanlylophoc/");
};

const renderDiemdanh = (idLop) => {
  $(".main").load("./quanlylophoc/diemdanh.html", function () {
    fetch(`${HOST}/api/diemdanh?idLop=${idLop}`)
      .then((res) => res.json())
      .then((data) => {
        document.querySelector("#myModalAdd #idLop").value = idLop;
        document.querySelector("#myModalUpdate #idLop").value = idLop;
        fetch(`${HOST}/api/lophocphan/${idLop}`)
          .then((res) => res.json())
          .then((data) => {
            document.querySelector("#tenLop").innerHTML = data.tenLop;
          })
          .catch((err) => console.log("Error: ", err));
        html = "";
        for (i = 0; i < data.length; i++) {
          elm = data[i];
          html += `<tr>
              <th>${i + 1}</th>
              <th>${formatDatetime(elm.thoiGianBd)}</th>
              <th>${formatDatetime(elm.thoiGianKt)}</th>
              <td>
                  <a style="margin-right: 5px;" type="button" onclick="renderChitietdiemdanh(${
                    elm.idDiemDanh
                  }, ${idLop})">
                      <i class="fa-solid fa-eye"></i>
                  </a>
                  <a style="margin-right: 5px;" type="button" data-bs-toggle="modal" data-bs-target="#myModalUpdate" data-id-diemDanh="${
                    elm.idDiemDanh
                  }" data-thoiGian-Bd="${elm.thoiGianBd}" data-thoiGian-Kt="${
            elm.thoiGianKt
          }">
                      <i class="fa-solid fa-wrench"></i>
                  </a>
              </td>
          </tr>`;
        }
        document.querySelector("#listDiemDanh").innerHTML = html;
      })
      .catch((err) => console.log("Error: ", err));
  });
};

const renderChitietdiemdanh = (idDiemDanh, idLop) => {
  $(".main").load("./quanlylophoc/chitietdiemdanh.html", function () {
    fetch(`${HOST}/api/diemdanh/chitiet/${idDiemDanh}`)
      .then((res) => res.json())
      .then((data) => {
        fetch(`${HOST}/api/lophocphan/${idLop}`)
          .then((res) => res.json())
          .then((data) => {
            document.querySelector("#tenLop").innerHTML = data.tenLop;
          })
          .catch((err) => console.log("Error: ", err));
        html = "";
        for (i = 0; i < data.length; i++) {
          elm = data[i];
          html += `<tr>
              <th>${i + 1}</th>
              <th>${elm.idsv}</th>
              <th>${elm.tensv}</th>
              <th>${
                elm.trangThai === "vang"
                  ? "Vắng"
                  : elm.trangThai === "muon"
                  ? "Muộn"
                  : "Có Mặt"
              }</th>
          </tr>`;
        }
        document.querySelector("#listSinhVienDD").innerHTML = html;
      })
      .catch((err) => console.log("Error: ", err));
  });
};

const renderTailieumonhoc = (idLop) => {
  $(".main").load("./quanlylophoc/tailieumonhoc.html", function () {
    fetch(`${HOST}/api/tailieu/${idLop}`)
      .then((res) => res.json())
      .then((data) => {
        fetch(`${HOST}/api/lophocphan/${idLop}`)
          .then((res) => res.json())
          .then((data) => {
            document.querySelector("#tenLop").innerHTML = data.tenLop;
          })
          .catch((err) => console.log("Error: ", err));
        html = "";
        for (i = 0; i < data.length; i++) {
          elm = data[i];
          html += `<tr>
              <th>${i + 1}</th>
              <th>${elm.idsv}</th>
              <th>${elm.tensv}</th>
              <th>${
                elm.trangThai === "vang"
                  ? "Vắng"
                  : elm.trangThai === "muon"
                  ? "Muộn"
                  : "Có Mặt"
              }</th>
          </tr>`;
        }
        document.querySelector("#listSinhVienDD").innerHTML = html;
      })
      .catch((err) => console.log("Error: ", err));
  });
};

// DANH SÁCH SINH VIÊN
const renderDSsinhvien = () => {
  $(".main").load("./danhsachsinhvien/");
};

//THỐNG KÊ ĐIỂM
const renderThongkediem = () => {
  $(".main").load("../quantrivien/thongke/diem.html");
};
