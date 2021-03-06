const renderLopHoc = () => {
  let idsv = JSON.parse(localStorage.getItem("user")).idsv;

  fetch(`${HOST}/api/sinhvien/thongke/dadangkyhoc?idsv=${idsv}`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      for (i = 0; i < data.length; i++) {
        elm = data[i];
        html += `
          <tr>
          <td>${i + 1}</td>
          <td>${elm.tenLop}</td>
          <td>
              <a style="margin-right: 5px;" type="button" onclick="renderDiemdanh(${
                elm.idLop
              })">
                  <i class="fa-solid fa-eye"></i>
              </a>
          </td>
          <td>
              <a style="margin-right: 5px;" type="button" onclick="renderTailieumonhoc(${
                elm.idLop
              })">
                  <i class="fa-solid fa-eye"></i>
              </a>
          </td>
          </tr>
          `;
      }
      document.querySelectorAll("#getLopHoc").forEach((elm) => {
        elm.innerHTML = html;
      });
    })
    .catch((err) => console.log("Error: ", err));
};

const renderDiemdanh = (id) => {
  let idLop = id;
  fetch(`${HOST}/api/diemdanh?idLop=${idLop}`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      for (i = 0; i < data.length; i++) {
        elm = data[i];
        html += `<tr>
          <td>${i + 1}</td>
          <td>${formatDatetime(elm.thoiGianBd)}</td>
          <td>${formatDatetime(elm.thoiGianKt)}</td>
          <td>
            ${
              elm.trangThai === "vang"
                ? "Vắng"
                : elm.trangThai === "muon"
                ? "Muộn"
                : "Có Mặt"
            } 
          </td>
          <th>
          <button type="button" class="btn btn-success" style="" onclick="updateDiemDanh(${
            elm.idDiemDanh
          })" 
          >Điểm Danh</button>
              </th>
          </tr>
        `;
      }
      document.querySelectorAll("#listDiemDanh").forEach((elm) => {
        elm.innerHTML = html;
      });
      document.getElementById("idLop").value = idLop;
    })
    .catch((err) => console.log("Error: ", err));
  $(".main").load("./lophoc/diemdanh.html");
};

const renderTailieumonhoc = (idLop) => {
  $(".main").load("./lophoc/tailieumonhoc.html", function () {
    fetch(`${HOST}/api/tailieu/${idLop}`)
      .then((res) => res.json())
      .then((data) => {
        fetch(`${HOST}/api/lophocphan/${idLop}`)
          .then((res) => res.json())
          .then((data) => {
            document.querySelector("#title").innerHTML += ` Lớp ${data.tenLop}`;
            document.querySelector("#myModalUpload #idLop").value = data.idLop;
          })
          .catch((err) => console.log("Error: ", err));
        html = "";
        for (i = 0; i < data.length; i++) {
          elm = data[i];
          html += `<tr>
              <th>${i + 1}</th>
              <th>${elm.tenTaiLieu}</th>
              <th>${moment(elm.thoiGianDang)
                .format("YYYY-MM-DDTkk:mm")
                .split("T")
                .join("  ")}</th>
              <th><a href="${HOST}/api/tailieu/download/${
            elm.duongDan.split("/")[1]
          }"> <i class="bi bi-download""></i></a></th>
          </tr>`;
        }
        document.querySelector("#listTaiLieu").innerHTML = html;
      })
      .catch((err) => console.log("Error: ", err));
  });
};

const updateDiemDanh = (id) => {
  const idsv = JSON.parse(localStorage.getItem("user")).idsv;
  const idDiemDanh = id;
  idLop = document.getElementById("idLop").value;
  fetch(`${HOST}/api/diemdanh/sinhvien/${idsv}`, {
    method: "PUT", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idDiemDanh: idDiemDanh }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Điểm danh thành công");
      renderDiemdanh(idLop);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const getMonHocSinhVienDangKyHoc = () => {
  fetch(`${HOST}/api/monhoc/`)
    .then((res) => res.json())
    .then((data) => {
      let html = `<option  value=""> Chọn Môn học</option>`;
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

const getCoTheDangKyHoc = () => {
  let idmh = document.getElementById("monhoc").value;
  const idsv = JSON.parse(localStorage.getItem("user")).idsv;
  fetch(
    `${HOST}/api/sinhvien/thongke/cothedangkyhoc/?idsv=${idsv}&idmh=${idmh}`
  )
    .then((res) => res.json())
    .then((data) => {
      let html = "";

      for (i = 0; i < data.length; i++) {
        elm = data[i];
        if (elm.daDangKy <= elm.soLuong) {
          html += `<tr>
          <td>${i + 1}</td>
          <td>${elm.tenLop}</td>
          <td>${formatDate(elm.thoiGianBd)} - ${formatDate(elm.thoiGianBd)}</td>
          <td>${elm.phongHoc}</td>
          <td>${elm.tengv}</td>
          <td>${elm.daDangKy + "/" + elm.soLuong}</td>
          <td>${elm.soTinChi}</td>
          <td>${elm.tienHoc}</td>
          <td> <button type="button" class="btn btn-primary" style="padding:3px" onClick=xuLyDangKyHoc(${
            elm.idLop
          })>Đăng Ký</button> </td>
        </tr>`;
        }
      }
      document.querySelector("#listCoTheDangKyHoc").innerHTML = html;
    })
    .catch((err) => console.log("Error: ", err));
};

const xuLyDangKyHoc = (id) => {
  const idsv = JSON.parse(localStorage.getItem("user")).idsv;
  fetch(`${HOST}/api/sinhvien/dangkyhoc/${idsv}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idLop: id }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        alert("Bạn đã đăng ký lớp học phần này");
      } else {
        alert("Đăng ký lớp học phần thành công");
        renderDangkyhoc();
      }
    })
    .catch((err) => console.log("Error: ", err));
};

const getDaDangKyHoc = () => {
  const idsv = JSON.parse(localStorage.getItem("user")).idsv;
  fetch(`${HOST}/api/sinhvien/thongke/dadangkyhoc?idsv=${idsv}&idky=`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      for (i = 0; i < data.length; i++) {
        elm = data[i];
        html += `<tr>
          <td>${i + 1}</td>
          <td>${elm.tenLop}</td>
          <td>${formatDate(elm.thoiGianBd)} - ${formatDate(elm.thoiGianBd)}</td>
          <td>${elm.phongHoc}</td>
          <td>${elm.tengv}</td>
          <td>${elm.siSo}</td>
          <td>${elm.soTinChi}</td>
          <td>${elm.tienHoc}</td>
          <td> <button type="button" class="btn btn-primary" style="padding:3px" onClick=huyDangKyHoc(${
            elm.idLop
          })>Hủy</button> </td>
        </tr>`;
      }
      document.querySelector("#listDaDangKyHoc").innerHTML = html;
    })
    .catch((err) => console.log("Error: ", err));
};

const huyDangKyHoc = (id) => {
  const idsv = JSON.parse(localStorage.getItem("user")).idsv;
  result = window.confirm("Bạn có muốn hủy học phần này không?");
  if (result === true) {
    fetch(`${HOST}/api/sinhvien/dangkyhoc/huy?idsv=${idsv}&idLop=${id}`, {
      method: "DELETE", // or 'PUT'
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Hủy lớp thành công");
        renderDangkyhoc();
      })
      .catch((err) => console.log("Error: ", err));
  }
};
