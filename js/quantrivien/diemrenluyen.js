const renderDiemRenLuyen = () => {
  const inputName = document.querySelector("#inputName").value.trim();
  const inputKhoa = document.querySelector("#khoa").value;
  const inputKyHoc = document.querySelector("#kyHoc").value;
  if (!inputKhoa || !inputKyHoc) alert("Yêu cầu chọn đầy đủ thông tin");
  else if (!inputName) alert("Yêu cầu nhập tên sinh viên");
  else
    fetch(
      `${HOST}/api/diemrenluyen/?idKhoa=${inputKhoa}&idky=${inputKyHoc}&tensv=${inputName}`
    )
      .then((res) => res.json())
      .then((data) => {
        let html = "";
        if (data.length > 0) {
          for (i = 0; i < data.length; i++) {
            elm = data[i];
            html += `<tr>
                      <th scope="row">${i + 1}</th>
                      <td>${elm.idsv}</td>
                      <td>${elm.tensv}</td>
                      <td>${elm.tenKhoa}</td>
                      <td>${elm.tenKyHoc}</td>
                      <td>${elm.diem}</td>
                  </tr>`;
          }
        } else alert("Không có kết quả");
        document.querySelector("#ListDiemRenLuyen").innerHTML = html;
      })
      .catch((err) => console.log("Error: ", err));
};
