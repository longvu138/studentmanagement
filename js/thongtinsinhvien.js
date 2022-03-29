const renderSV = () => {
  const keyword = document.querySelector("#searchInput").value;
  fetch(`${HOST}/api/sinhvien/?tukhoa=${keyword}`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      let i = 1;
      data.forEach((elm) => {
        html += `<tr>
                        <th scope="row">${i++}</th>
                        <td>${elm.tensv}</td>
                        <td>${formatDate(elm.ngaySinh)}</td>
                        <td>${elm.laNam === 1 ? "Nam" : "Nữ"}</td>
                        <td>${elm.sdt}</td>
                       
                      
                        <td>
                            <a onclick="openUpdateSV(${
                              elm.idsv
                            })" style="margin-right: 5px;" type="button" data-bs-toggle="modal" data-bs-target="#myModalUpdate"><i
                                    class="fa-solid fa-wrench"></i>
                            </a>

                            <a 
                            onclick="openViewSV(${elm.idsv})"
                             type="button" data-bs-toggle="modal" data-bs-target="#myModelView"><i class="fa-solid fa-eye"></i>
                               
                            </a>
                        </td>
                    </tr>`;
      });

      document.querySelector("#listSinhVien").innerHTML = html;
    })
    .catch((err) => console.log("Error: ", err));
};

const openUpdateSV = (id) => {
  fetch(`${HOST}/api/sinhvien/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("#formUpdate #maSinhVien").value = data.idsv;
      document.querySelector("#formUpdate #hoVaTen").value = data.tensv;
      document.querySelector("#formUpdate #ngaySinh").value = formatDate(
        data.ngaySinh
      );
      document.querySelector("#formUpdate #gioiTinh").value = data.laNam;
      document.querySelector("#formUpdate #khoa").value = data.idKhoa;
      document.querySelector("#formUpdate #kyTucXa").value = data.kyTucXa;
      document.querySelector("#formUpdate #queQuan").value = data.queQuan;
      document.querySelector("#formUpdate #diaChi").value = data.diaChi;
      document.querySelector("#formUpdate #soDienThoai").value = data.sdt;
      document.querySelector("#formUpdate #CCCD").value = data.cccd;
      document.querySelector("#formUpdate #hoTenBo").value = data.tenBo;
      document.querySelector("#formUpdate #namSinhBo").value = formatDate(
        data.namSinhBo
      );
      document.querySelector("#formUpdate #ngheNghiepBo").value =
        data.ngheNghiepBo;
      document.querySelector("#formUpdate #sdtBo").value = data.sdtBo;
      document.querySelector("#formUpdate #hoTenMe").value = data.tenMe;
      document.querySelector("#formUpdate #namSinhMe").value = formatDate(
        data.namSinhMe
      );
      document.querySelector("#formUpdate #ngheNghiepMe").value =
        data.ngheNghiepMe;
      document.querySelector("#formUpdate #sdtMe").value = data.sdtMe;
      document.querySelector("#formUpdate #idtk").value = data.idtk;
    });
};

const openViewSV = (id) => {
  fetch(`${HOST}/api/sinhvien/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("#formView #maSinhVien").value = data.idsv;
      document.querySelector("#formView #hoVaTen").value = data.tensv;
      document.querySelector("#formView #ngaySinh").value = formatDate(
        data.ngaySinh
      );
      document.querySelector("#formView #gioiTinh").value = data.laNam;
      document.querySelector("#formView #khoa").value = data.idKhoa;
      document.querySelector("#formView #kyTucXa").value = data.kyTucXa;
      document.querySelector("#formView #queQuan").value = data.queQuan;
      document.querySelector("#formView #diaChi").value = data.diaChi;
      document.querySelector("#formView #soDienThoai").value = data.sdt;
      document.querySelector("#formView #CCCD").value = data.cccd;
      document.querySelector("#formView #hoTenBo").value = data.tenBo;
      document.querySelector("#formView #namSinhBo").value = formatDate(
        data.namSinhBo
      );
      document.querySelector("#formView #ngheNghiepBo").value =
        data.ngheNghiepBo;
      document.querySelector("#formView #sdtBo").value = data.sdtBo;
      document.querySelector("#formView #hoTenMe").value = data.tenMe;
      document.querySelector("#formView #namSinhMe").value = formatDate(
        data.namSinhMe
      );
      document.querySelector("#formView #ngheNghiepMe").value =
        data.ngheNghiepMe;
      document.querySelector("#formView #sdtMe").value = data.sdtMe;
      document.querySelector("#formView #idtk").value = data.idtk;
    });
};
