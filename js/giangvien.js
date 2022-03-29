const renderGiangVien = () => {
  const tuKhoa = document.querySelector("#searchInput").value;
  fetch(`${HOST}/api/giangvien/?tukhoa=${tuKhoa}`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      let i = 1;
      data.forEach((elm) => {
        html += `<tr>
                            <th scope="row">${i++}</th>
                            <td>${elm.idgv}</td>
                            <td>${elm.tengv}</td>
                            <td>
                                <a 
                                onclick="openUpdateGiangVien(${elm.idgv})"
                                 style="margin-right: 5px;" type="button" data-bs-toggle="modal" data-bs-target="#myModalUpdate"><i
                                        class="fa-solid fa-wrench"></i>
                                </a>

                                <a 
                                onclick="openViewGV(${elm.idgv})"
                                 style="margin-right: 5px;" type="button" data-bs-toggle="modal" data-bs-target="#myModalView"> 
                                <i class="fa-solid fa-eye"></i>
                                </a>
                                
                            </td>
                           
                        </tr>`;
      });

      document.querySelector("#listGiangVien").innerHTML = html;
    })
    .catch((err) => console.log("Error: ", err));
};

const openUpdateGiangVien = (id) => {
  fetch(`${HOST}/api/giangvien/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("#formUpdate #idgv").value = data.idgv;
      document.querySelector("#formUpdate #tengv").value = data.tengv;
      document.querySelector("#formUpdate #laNam").value = data.laNam;
      document.querySelector("#formUpdate #ngaySinh").value = formatDate(
        data.ngaySinh
      );
      document.querySelector("#formUpdate #queQuan").value = data.queQuan;
      document.querySelector("#formUpdate #diaChi").value = data.diaChi;
      document.querySelector("#formUpdate #sdt").value = data.sdt;
      document.querySelector("#formUpdate #cccd").value = data.cccd;
      document.querySelector("#formUpdate #email").value = data.email;
      document.querySelector("#formUpdate #khoa").value = data.idKhoa;
      document.querySelector("#formUpdate #tenDangNhap").value =
        data.tenDangNhap;
      document.querySelector("#formUpdate #idtk").value = data.idtk;
    });
};

const openViewGV = (id) => {
  fetch(`${HOST}/api/giangvien/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("#formView #tengv").value = data.tengv;
      document.querySelector("#formView #laNam").value =
        data.laNam === 1 ? "nam" : "nữ";
      document.querySelector("#formView #ngaySinh").value = formatDate(
        data.ngaySinh
      );
      document.querySelector("#formView #queQuan").value = data.queQuan;
      document.querySelector("#formView #diaChi").value = data.diaChi;
      document.querySelector("#formView #idKhoa").value = data.sdt;
      document.querySelector("#formView #sdt").value = data.cccd;
      document.querySelector("#formView #email").value = data.email;
      document.querySelector("#formView #cccd").value = data.idKhoa;
      document.querySelector("#formView #idtk").value = data.idtk;
      document.querySelector("#formView #tenDangNhap").value = data.tenDangNhap;
    });
};
