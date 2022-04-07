//LỚP HỌC
const renderLophoc = () => {
  $(".main").load("./lophoc");
};

//QUẢN LÝ HỌC PHẦN
const renderQLhocphan = () => {
  $(".main").load("./quanlyhocphan");
};

const renderDangkyhoc = () => {
  $(".main").load("./quanlyhocphan/dangkyhoc.html");
};

const renderKetquadangky = () => {
  $(".main").load("./quanlyhocphan/ketquadangky.html");
};

const getKetQuaDangKy = () => {
  const idsv = JSON.parse(localStorage.getItem("user")).idsv;
  const idky = document.querySelector("#kyHoc").value;
  fetch(`${HOST}/api/sinhvien/thongke/dadangkyhoc?idsv=${idsv}&idky=${idky}`)
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
        </tr>`;
      }
      document.querySelector("#listKetQuaDangky").innerHTML = html;
    })
    .catch((err) => console.log("Error: ", err));
};

//TRA CỨU HỌC PHÍ
const renderTracuuhocphi = () => {
  $(".main").load("./tracuuhocphi/");
};

const getHocPhiChuaThu = () => {
  const idsv = JSON.parse(localStorage.getItem("user")).idsv;
  fetch(`${HOST}/api/hocphi/chuathu?idsv=${idsv}`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      for (i = 0; i < data.length; i++) {
        elm = data[i];
        html += `<tr>
          <th scope="row">${i + 1}</th>
          <td>${elm.tenKyHoc}</td>
          <td>${elm.tongTien}</td>
      </tr>`;
      }
      document.querySelector("#listChuaThu").innerHTML = html;
    })
    .catch((err) => console.log("Error: ", err));
};

const getHocPhiDaThu = () => {
  const idsv = JSON.parse(localStorage.getItem("user")).idsv;
  fetch(`${HOST}/api/hocphi/dathu?idsv=${idsv}`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      for (i = 0; i < data.length; i++) {
        elm = data[i];
        html += `<tr>
          <th scope="row">${i + 1}</th>
          <td>${elm.tenKyHoc}</td>
          <td>${elm.tongTien}</td>
      </tr>`;
      }
      document.querySelector("#listDaThu").innerHTML = html;
    })
    .catch((err) => console.log("Error: ", err));
};

//TRA CỨU LỊCH THI
const renderTracuulichthi = () => {
  $(".main").load("./tracuulichthi/");
};

const getLichThiSV = () => {
  const idky = document.querySelector("#kyHoc").value;
  const idsv = JSON.parse(localStorage.getItem("user")).idsv;
  fetch(`${HOST}/api/lichthi?idsv=${idsv}&idky=${idky}`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      for (i = 0; i < data.length; i++) {
        elm = data[i];
        html += `<tr>
          <td>${i + 1}</td>
          <td>${elm.tenKyHoc}</td>
          <td>${elm.tenMon}</td>
          <td>${elm.sbd}</td>
          <td>${elm.phongThi}</td>
          <td>${formatDatetime(elm.thoiGian)}</td>
      </tr>`;
      }
      document.querySelector("#listLichThi").innerHTML = html;
    })
    .catch((err) => console.log("Error: ", err));
};
