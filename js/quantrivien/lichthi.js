const renderLopLT = () => {
  const tuKhoa = document.querySelector("#tenLop").value.trim();
  const idky = document.querySelector("#kyHoc").value;
  fetch(`${HOST}/api/lophocphan/?tenlop=${tuKhoa}&idky=${idky}`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      let i = 1
      data.forEach((elm) => {
        if (elm.trangThai === 'hoatdong') {
          html += `<tr>
                      <th scope="row" >${i++}</th>
                      <td>${elm.tenLop}</td>
                      <td>${elm.tenKyHoc}</td>
                      <td>${elm.tenMon}</td>
                      <td >${elm.tengv}</td>
                      <td >${elm.soLuong}</td>
                      <td>
                          <a onclick=openAddLichThi(${elm.idLop
            }) type="button" data-bs-toggle="modal" data-bs-target="#myModalAdd">
                            <i class="fa-solid fa-plus"></i>
                          </a>
                          <a onClick=openUpdateLichThi(${elm.idLop
            }) style="margin-right: 5px;" type="button" data-bs-toggle="modal" data-bs-target="#myModalUpdate">
                              <i class="fa-solid fa-wrench"></i>
                          </a>
                          <a onClick=openViewLichThi(${elm.idLop
            })   style="margin-right: 5px;" type="button" data-bs-toggle="modal" data-bs-target="#myModalView"><i class="fa-solid fa-eye"></i>
                          </a>
                      </td>
                  </tr>`;
        }
      })
      document.querySelector("#listLop").innerHTML = html;
    })
    .catch((err) => console.log("Error: ", err));
};

const openAddLichThi = (idLop) => {
  document.querySelector('#formAdd #idLop').value = idLop
}

const openUpdateLichThi = async (idLop) => {
  const lichthi = await fetch(`${HOST}/api/lichthi/${idLop}`)
    .then(res => res.json())
    .then(data => data)
  console.log(lichthi)
  document.querySelector('#formUpdate #idLop').value = idLop
  document.querySelector('#formUpdate #thoiGianThi').value = lichthi.thoiGian ? moment(lichthi.thoiGian).format("YYYY-MM-DDTkk:mm") : ""
  document.querySelector('#formUpdate #phongThi').value = lichthi.phongThi
}

const openViewLichThi = async (idLop) => {

  document.querySelector('#formView #tenLop').value = ""
  document.querySelector('#formView #monHoc').value = ""
  document.querySelector('#formView #giangVien').value = ""
  document.querySelector('#formView #soLuong').value = ""
  document.querySelector('#formView #thoiGianThi').value = ""
  document.querySelector('#formView #phongThi').value = ""

  const lop = await fetch(`${HOST}/api/lophocphan/${idLop}`)
    .then(res => res.json())
    .then(data => data)
  const lichthi = await fetch(`${HOST}/api/lichthi/${idLop}`)
    .then(res => res.json())
    .then(data => data)

  document.querySelector('#formView #tenLop').value = lop.tenLop
  document.querySelector('#formView #monHoc').value = lop.tenMon
  document.querySelector('#formView #giangVien').value = lop.tengv
  document.querySelector('#formView #soLuong').value = lop.soLuong
  document.querySelector('#formView #thoiGianThi').value = lichthi.thoiGian ? moment(lichthi.thoiGian).format("YYYY-MM-DDTkk:mm") : ""
  document.querySelector('#formView #phongThi').value = lichthi.phongThi ? lichthi.phongThi : ""
}