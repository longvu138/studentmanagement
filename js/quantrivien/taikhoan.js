const quanLyTaiKhoan = () => {
  const chucNang = document.querySelector("#searchChucNang").value;
  const tuKhoa = document.querySelector("#searchTextInput").value.trim();
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (tuKhoa.length == 0){
    alert("Bạn chưa nhập thông tin tìm kiếm")
  }
  else if(format.test(tuKhoa)){
    alert("Không nhập các ký tự đặc biệt như $, %,^ ,&, ,..");
  }
  else if (tuKhoa.length > 255) {
    alert("Không được quá 255 ký tự");
    return;
  } else
    fetch(`${HOST}/api/taikhoan/?tenDangNhap=${tuKhoa}&chucNang=${chucNang}`)
      .then((res) => res.json())
      .then((data) => {
        let html = "";
        if (data.length > 0)
        for(i=0; i<data.length; i++) {
          elm = data[i]
          html += `<tr>
                            <th scope="row">${i++}</th>
                            <td>${elm.tenDangNhap}</td>
                            <td>${elm.chucNang}</td>
                            <td>${
                              elm.trangThai === 1 ? "Hoạt động" : "Dừng"
                            }</td>
                            <td>
                                <a  onclick=openUpdateTaiKhoan(${
                                  elm.idtk
                                }) style="margin-right: 5px;" type="button" data-bs-toggle="modal" data-bs-target="#myModaldata">
                                     <i
                                        class="fa-solid fa-wrench"></i>
                                   
                                    </i>
                                </a>
                                <a onclick="openBlockTaiKhoan(${
                                  elm.idtk
                                })" type="button" data-bs-toggle="modal" data-bs-target="#myModal3">
                                    <i class="fa-solid fa-ban"></i>
                                   
                                    </i>
                                </a>
                            </td>
                        </tr>`;
        }else alert ("Không có kết quả")

        document.querySelector("#listTaiKhoan").innerHTML = html;
      })
      .catch((err) => console.log("Error: ", err));
};

const openUpdateTaiKhoan = (id) => {
  fetch(`${HOST}/api/taikhoan/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.querySelector("#formUpdate #maTaiKhoan").value = data.idtk;
      document.querySelector("#formUpdate #tenDangNhap").value =
        data.tenDangNhap;
      document.querySelector("#formUpdate #chucNang").value = data.chucNang;
      document.querySelector("#formUpdate #trangThai").value = data.trangThai;
    });
};

const openBlockTaiKhoan = (id) => {
  document.querySelector("#formBlock #idtk").value = id;
};
