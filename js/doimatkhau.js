function doiMatKhau() {
  const matKhauCu = document.getElementById("matKhauCu").value;
  const matKhauMoi = document.getElementById("matKhauMoi").value;
  const xacThucMatKhauMoi = document.getElementById("xacThucMatKhauMoi").value;
  const matKhauCuHash = JSON.parse(localStorage.getItem("user")).taiKhoan
    .matKhau;
  const idtk = JSON.parse(localStorage.getItem("user")).taiKhoan.idtk;

  if (matKhauMoi != xacThucMatKhauMoi) {
    alert("Mật khẩu mới không khớp");
  } else {
    fetch(`${HOST}/api/taikhoan/doimatkhau/${idtk}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        matKhauCu: matKhauCu,
        matKhauCuHash: matKhauCuHash,
        matKhauMoi: matKhauMoi,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Nội dung trống!") {
        } else {
          if (data.message === "Mật khẩu đã được cập nhật") {
            alert(data.message);

            location.reload();
          } else {
            alert(data.message);
          }
        }
      })
      .catch((err) => console.log("Error: ", err));
  }
}
