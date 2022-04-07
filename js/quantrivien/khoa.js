const renderKhoa = () => {
  const tuKhoa = document.querySelector("#searchInput").value;
  fetch(`${HOST}/api/khoa/?tukhoa=${tuKhoa}`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      if (data.length > 0) {
        for (i = 0; i < data.length; i++) {
          elm = data[i]
          html += `<tr>
                            <th scope="row">${i + 1}</th>
                            <td>${elm.tenKhoa}</td>
                            <td>
                                <a 
                                onclick="openUpdateKhoa(${elm.idKhoa})"
                                 style="margin-right: 5px;" type="button" data-bs-toggle="modal" data-bs-target="#myModalUpdate"><i
                                        class="fa-solid fa-wrench"></i>
                                </a>
                            </td>
                        </tr>`;
        }
      } else alert("Không có kết quả");
      document.querySelector("#listKhoa").innerHTML = html;
    })
    .catch((err) => console.log("Error: ", err));
};

const openUpdateKhoa = (id) => {
  fetch(`${HOST}/api/khoa/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("#formUpdate #maKhoa").value = data.idKhoa;
      document.querySelector("#formUpdate #tenKhoa").value = data.tenKhoa;
    });
};
