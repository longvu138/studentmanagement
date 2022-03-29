const renderCTDT = () => {
  const tuKhoa = document.querySelector("#searchInput").value;
  const idkhoa = document.getElementById("khoa").value;
  fetch(`${HOST}/api/ctdaotao?idKhoa=${idkhoa}&tenctdt=${tuKhoa}`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      let i = 1;
      data.forEach((elm) => {
        html += `<tr>
                            <th scope="row">${i++}</th>
                            <td>${elm.tenctdt}</td>
                            <td >${elm.tenKhoa}</td>
                          <td>
                          <a
                          onclick="openUpdateCTDT(${elm.idctdt})"
                           style="margin-right: 5px;" type="button" data-bs-toggle="modal" data-bs-target="#myModalUpdate"><i
                                  class="fa-solid fa-wrench"></i>
                          </a></td>
                        <td>
                       <a  onclick=renderChiTietChuongTrinhDaoTao(${
                         elm.idctdt
                       }) style="margin-right: 5px;" type="button">
                       <i class="fa-solid fa-eye"></i>
                       </a></td>
                        </td>
                          </tr>
                        `;
      });

      document.querySelector("#listCTDT").innerHTML = html;
    })
    .catch((err) => console.log("Error: ", err));
};
const openUpdateCTDT = (id) => {
  fetch(`${HOST}/api/ctdaotao/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("#formUpdate #idCTDT").value = data.idctdt;
      document.querySelector("#formUpdate #tenCTDT").value = data.tenctdt;
      document.querySelector("#formUpdate #khoa").value = data.idKhoa;
    });
};

const renderChiTietChuongTrinhDaoTao = (id) => {
  fetch(`${HOST}/api/ctdaotao/chitiet/${id}`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      let i = 1;
      if (data.message) {
        html = `<h4 style="color:red">${data.message}</h4>`;
      } else {
        data.forEach((elm) => {
          html += `
              <input type="text" hidden id="getIDCTDT" value=${id}>
                     <tr>
                     <th scope="row">${i++}</th>
                      <td>${elm.tenMon}</td>
                      <td >${elm.soTinChi}</td>
                      <td >${elm.tienHoc}</td>              
                      <td>
                         <a type="button"  onClick=deleteCTCTDT(${
                           elm.idmh
                         })><i class="fa-solid fa-trash"></i>
                         </a>                             
                    </tr>`;
        });
      }

      document.querySelector("#listCTCTDT").innerHTML = html;
      document.querySelector("#formAdd #idCTDT").value = id;
    });

  $(".main").load("xemchitietchuongtrinhdaotao.html");
};

const deleteCTCTDT = (idmh) => {
  let id = document.getElementById("getIDCTDT").value;
  result = window.confirm("bạn có muốn xoá không?");
  if (result === true) {
    fetch(`${HOST}/api/ctdaotao/chitiet/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idmh: idmh,
      }),
    })
      .then(() => {
        alert("Xoá thành công");
        renderChiTietChuongTrinhDaoTao(id);
      })
      .catch((err) => {
        console.error(err);
      });
  }
};