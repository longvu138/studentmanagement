const renderSVKTX = () => {
  const kytucxa = document.querySelector("#flexSwitchKTX").checked;
  fetch(`${HOST}/api/sinhvien/thongke/kytucxa?kytucxa=${kytucxa}`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      for (i = 0; i < data.length; i++) {
        elm = data[i];
        html += `<tr>
                            <th scope="row">${i + 1}</th>
                            <td>${elm.idsv}</td>
                            <td>${elm.tensv}</td>
                            <td>${elm.laNam === 1 ? "Nam" : "Nữ"}</td>
                            <td>${elm.sdt}</td>
                        </tr>`;
      }
      document.querySelector("#listSVKTX").innerHTML = html;
    })
    .catch((err) => console.log("Error: ", err));
};

const renderSVTKD = () => {
  const tenLop = document.querySelector("#tenLop").value.trim();
  const idky = document.querySelector("#kyHoc").value;
  if (!idky) alert("Yêu cầu chọn đầy đủ thông tin thống kê");
  else
    fetch(`${HOST}/api/diem?tenlop=${tenLop}&idky=${idky}`)
      .then((res) => res.json())
      .then((data) => {
        let html = "";
        for (i = 0; i < data.length; i++) {
          elm = data[i];
          html += `<tr>
                    <th scope="row">${i + 1}</th>
                    <td>${elm.idsv}</td>
                    <td>${elm.tensv}</td>
                    <td>${elm.tenLop}</td>
                    <td>${elm.diemQuaTrinh}</td>
                    <td>${elm.diemThi}</td>
                    <td>${elm.diemTrungBinh}</td>
                    <td>${elm.diemHeSo4}</td>
                </tr>`;
        }
        document.querySelector("#listDiemTheoLop").innerHTML = html;
      })
      .catch((err) => console.log("Error: ", err));
};

const renderSVDRL = () => {
  const idKhoa = document.querySelector("#khoa").value;
  const idky = document.querySelector("#kyHoc").value;

  if (!idKhoa || !idky) alert("Yêu cầu chọn đầy đủ thông tin thống kê");
  else
    fetch(`${HOST}/api/diemrenluyen?idKhoa=${idKhoa}&idky=${idky}`)
      .then((res) => res.json())
      .then((data) => {
        let html = "";
        for (i = 0; i < data.length; i++) {
          elm = data[i];
          html += `<tr>
                    <th scope="row">${i + 1}</th>
                    <td>${elm.idsv}</td>
                    <td>${elm.tensv}</td>
                    <td>${elm.tenKhoa}</td>
                    <td>${elm.tenKyHoc}</td>
                    <td>${elm.tongTien}</td>
                </tr>`;
        }
        document.querySelector("#ListDiemRenLuyen").innerHTML = html;
      })
      .catch((err) => console.log("Error: ", err));
};

const renderSVHB = () => {
  const idKhoa = document.querySelector("#khoa").value;
  const idky = document.querySelector("#kyHoc").value;
  if (!idKhoa || !idky) alert("Yêu cầu chọn đầy đủ thông tin thống kê");
  else
    fetch(
      `${HOST}/api/sinhvien/thongke/hocbong?idKhoa=${idKhoa}&idky=${idky}&gioiHan=`
    )
      .then((res) => res.json())
      .then((data) => {
        let html = "";
        for (i = 0; i < data.length; i++) {
          elm = data[i];
          html += `<tr>
                  <th scope="row">${i + 1}</th>
                  <td>${elm.idsv}</td>
                  <td>${elm.tensv}</td>
                  <td>${elm.tenKhoa}</td>
                  <td>${elm.tenKyHoc}</td>
                  <td>${elm.DiemRenLuyen}</td>
                  <td>${elm.DiemTichLuy}</td>
              </tr>`;
        }
        document.querySelector("#listHocBong").innerHTML = html;
      })
      .catch((err) => console.log("Error: ", err));
};

const renderSVHP = () => {
  const idKhoa = document.querySelector("#khoa").value;
  const idky = document.querySelector("#kyHoc").value;
  const tinhTrang = document.querySelector("#tinhTrang").value;
  if (!idKhoa || !idky || !tinhTrang)
    alert("Yêu cầu chọn đầy đủ thông tin thống kê");
  else
    fetch(
      `${HOST}/api/sinhvien/thongke/hocphi?idKhoa=${idKhoa}&idky=${idky}&tinhTrang=${tinhTrang}`
    )
      .then((res) => res.json())
      .then((data) => {
        let html = "";
        for (i = 0; i < data.length; i++) {
          elm = data[i];
          html += `<tr>
                    <th scope="row">${i + 1}</th>
                    <td>${elm.idsv}</td>
                    <td>${elm.tensv}</td>
                    <td>${elm.tenKhoa}</td>
                    <td>${elm.tenKyHoc}</td>
                    <td>${elm.tongTien}</td>
                </tr>`;
        }
        document.querySelector("#listHocPhiSinhVien").innerHTML = html;
      })
      .catch((err) => console.log("Error: ", err));
};
