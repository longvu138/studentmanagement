const renderMonHoc = () => {
  const tuKhoa = document.querySelector("#searchInput").value;
  fetch(`${HOST}/api/monhoc/?tukhoa=${tuKhoa}`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      let i = 1;
      data.forEach((elm) => {
        html += `<tr>
                            <th scope="row">${i++}</th>
                            <td>${elm.tenMon}</td>
                            <td>${elm.soTinChi}</td>
                            <td>${elm.tienHoc}</td>
                            <td>
                                <a onclick=openUpdateMon(${
                                  elm.idmh
                                })  style="margin-right: 5px;" type="button" data-bs-toggle="modal" data-bs-target="#myModalUpdate"><i
                                        class="fa-solid fa-wrench"></i>
                                  
                                </a>
                            </td>
                        </tr>`;
      });

      document.querySelector("#listMonHoc").innerHTML = html;
    })
    .catch((err) => console.log("Error: ", err));
};

const openUpdateMon = (id) => {
  fetch(`${HOST}/api/monhoc/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("#formUpdate #maMon").value = data.idmh;
      document.querySelector("#formUpdate #tenMon").value = data.tenMon;
      document.querySelector("#formUpdate #soTinChi").value = data.soTinChi;
      document.querySelector("#formUpdate #tienHoc").value = data.tienHoc;
    });
};
