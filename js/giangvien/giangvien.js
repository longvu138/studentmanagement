
const renderDanhSachLopQLLH = () => {
    const tenlop = document.querySelector("#tenLop").value;
    const kyHoc = document.querySelector("#kyHoc").value;
    const idgv = JSON.parse(localStorage.getItem("user")).idgv;
    fetch(`${HOST}/api/lophocphan?tenlop=${tenlop}&idky=${kyHoc}&idgv=${idgv}`)
      .then((res) => res.json())
      .then((data) => {
        let html = "";
        for (i = 0; i < data.length; i++) {
          elm = data[i];
          html += `<tr>
          <th>${i + 1}</th>
          <th>${elm.tenLop}</th>
          <th>${elm.tenKyHoc}</th>
          <td>
              <a style="margin-right: 5px;" type="button" onclick="renderTailieumonhoc(${
                elm.idLop
              })">
                  <i class="fa-solid fa-eye"></i>
              </a>
          </td>
          <td>
              <a style="margin-right: 5px;" type="button" onclick="renderDiemdanh(${
                elm.idLop
              })">
                  <i class="fa-solid fa-eye"></i>
              </a>
          </td>
        </tr>`;
        }
        document.querySelector("#listLop").innerHTML = html;
      })
      .catch((err) => console.log("Error: ", err));
  };

const addDiemDanh = () => {
  let thoiGianBd = document.querySelector("#myModalAdd #thoiGianBd").value;
  let thoiGianKt = document.querySelector("#myModalAdd #thoiGianKt").value;
  let idLop = document.querySelector("#myModalAdd #idLop").value;

  if (!thoiGianBd) {
    alert("Thời gian bắt đầu không được bỏ trống");
  } else if (!thoiGianKt) {
    alert("Thời gian kết thúc không được bỏ trống");
  } else if ((thoiGianBd, thoiGianKt, idLop))
    fetch(`${HOST}/api/diemdanh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        thoiGianBd: thoiGianBd,
        thoiGianKt: thoiGianKt,
        idLop: idLop,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          alert("Thành công");
          renderDiemdanh(idLop);
          document.querySelector("#myModalAdd .btn-close").click();
        }
      })
      .catch((err) => console.log("Error: ", err));
  else {
    alert("Lỗi trong quá trình thêm điểm danh");
  }
};

const updateDiemDanh = () => {
  let thoiGianBd = document.querySelector("#myModalUpdate #thoiGianBd").value;
  let thoiGianKt = document.querySelector("#myModalUpdate #thoiGianKt").value;
  let idLop = document.querySelector("#myModalUpdate #idLop").value;
  let idDiemDanh = document.querySelector("#formUpdate #idDiemDanh").value;
  console.log(idDiemDanh);
  if (!thoiGianBd) {
    alert("Thời gian bắt đầu không được bỏ trống");
  } else if (!thoiGianKt) {
    alert("Thời gian kết thúc không được bỏ trống");
  } else if ((thoiGianBd, thoiGianKt, idLop))
    fetch(`${HOST}/api/diemdanh/${idDiemDanh}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        thoiGianBd: thoiGianBd,
        thoiGianKt: thoiGianKt,
        idLop: idLop,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          alert(data.message);
        } else {
          alert("Thành công");
          renderDiemdanh(idLop);
          document.querySelector("#myModalUpdate .btn-close").click();
        }
      })
      .catch((err) => console.log("Error: ", err));
  else {
    alert("Lỗi trong quá trình cập nhật điểm danh");
  }
};

const addTaiLieu = () => {
  let tenTaiLieu = document.querySelector("#myModalUpload #tenTaiLieu").value;
  let duongDan = document.querySelector("#myModalUpload #duongDan").value;
  let idLop = document.querySelector("#myModalUpload #idLop").value;
  fetch(`${HOST}/api/tailieu/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tenTaiLieu: tenTaiLieu,
      duongDan: duongDan,
      idLop: idLop,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
      } else {
        alert("Thành công");
        renderTailieumonhoc(idLop);
        document.querySelector("#myModalUpload .btn-close").click();
      }
    })
    .catch((err) => console.log("Error: ", err));
};

const renderLopHoc = () => {
  fetch(`${HOST}/api/lophocphan/`)
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
          <td>
            <a style="margin-right: 5px;" type="button" onclick="renderDiemTheoLop('${
              elm.tenLop
            }')">
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

const renderChiTieLop = (idLop) => {
  fetch(`${HOST}/api/sinhvien/thongke/${idLop}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0 && data[0].trangThai === "hoatdong") {
        $(".main").load(
          "./danhsachsinhvien/chitietdanhsachsinhvien.html",
          function () {
            document.querySelector("#tenLop").innerHTML = data[0].tenLop;
            html = "";
            for (i = 0; i < data.length; i++) {
              elm = data[i];
              html += `<tr>
              <th>${i + 1}</th>
              <th>${elm.idsv}</th>
              <th>${elm.tensv}</th>
              <th>${elm.tenKhoa}</th>
            </tr>`;
            }
            document.querySelector("#listSinhVien").innerHTML = html;
          }
        );
      } else if (data.length > 0 && data[0].trangThai === "tamdung")
        alert("Lớp học phần này đã tạm dừng");
      else alert("Lớp học phần này đang trống");
    })
    .catch((err) => console.log("Error: ", err));
};

const renderDanhSachLopTKSV = () => {
  const tenlop = document.querySelector("#tenLop").value;
  const kyHoc = document.querySelector("#kyHoc").value;
  const idgv = JSON.parse(localStorage.getItem("user")).idgv;
  fetch(`${HOST}/api/lophocphan?tenlop=${tenlop}&idky=${kyHoc}&idgv=${idgv}`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      for (i = 0; i < data.length; i++) {
        elm = data[i];
        html += `<tr>
                        <th scope="row">${i + 1}</th>
                        <td>${elm.tenLop}</td>
                        <td>${elm.tenKyHoc}</td>
                        <td>
                            <a onClick="renderChiTieLop(${
                              elm.idLop
                            })" style="margin-right: 5px;" type="button">
                                <i class="fa-solid fa-eye"></i>
                            </a>
                        </td>
                    </tr>`;
      }
      document.querySelector("#listLop").innerHTML = html;
    })
    .catch((err) => console.log("Error: ", err));
};

const renderDiemTheoLop = (tenLop) => {
  fetch(`${HOST}/api/diem?tenlop=${tenLop}&idky=`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      for (i = 0; i < data.length; i++) {
        elm = data[i];
        html += `
        <tr>
          <td>${i + 1}</td>
          <td>${elm.tensv}</td>
          <td>${
            elm.diemQuaTrinh === null ? "chưa có điểm" : elm.diemQuaTrinh
          }</td>
          <td>${elm.diemThi === null ? "chưa có điểm" : elm.diemThi}</td>
          <td>${
            elm.diemTrungBinh === null ? "chưa có điểm" : elm.diemTrungBinh
          }</td>
          <td>${elm.diemHeSo4 === null ? "chưa có điểm" : elm.diemHeSo4}</td>
          <td>
            
            ${
              elm.diemQuaTrinh !== null && elm.diemThi !== null
                ? `
              <a
              onclick=openUpdateDiem(${elm.idsv})
              style="margin-right: 10px;"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#myModalUpdate"
              data-id-svud="${elm.idsv}"
              data-id-diemud="${elm.idDiem}"
            >
            <i class="fa-solid fa-wrench"></i>
            </a>
              `
                : `
                <a
                style="margin-right: 10px;"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#myModalAdd"
                data-id-sv="${elm.idsv}"
                data-id-diem="${elm.idDiem}"
  
              >
                <i class="fa-solid fa-plus"></i>
              </a>
              `
            }
               
          </td>
        </tr>
        
        `;
      }
      document.getElementById("idLopDiem").value = elm.idLop;
      document.getElementById("tenLopDiem").innerHTML = elm.tenLop;
      document.getElementById("tenLop").value = elm.tenLop;
      document.querySelectorAll("#renderDiemTheoLop").forEach((elm) => {
        elm.innerHTML = html;
      });
    })
    .catch((err) => console.log("Error: ", err));
  $(".main").load("./quanlydiem/lophocphan.html");
};

const openUpdateDiem = (id) => {
  console.log(id);
  fetch(`${HOST}/api/diem/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("#formUpdate #diemQuaTrinh").value =
        data[0].diemQuaTrinh;
      document.querySelector("#formUpdate #diemThi").value = data[0].diemThi;
      document.querySelector("#formUpdate #idsv").value = data[0].idsv;
      document.querySelector("#formUpdate #idDiem").value = data[0].idDiem;
      document.querySelector("#formUpdate #tenLop").value = data[0].tenLop;
    })
    .catch((err) => console.log("Error: ", err));
};
