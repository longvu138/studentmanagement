const renderKhoa = () => {
  const tuKhoa = document.querySelector("#searchInput").value;
  fetch(`${HOST}/api/khoa/?tukhoa=${tuKhoa}`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      let i = 1;
      data.forEach((elm) => {
        html += `<tr>
                            <th scope="row">${i++}</th>
                            <td>${elm.tenKhoa}</td>
                            <td>
                                <a 
                                onclick="openUpdateKhoa(${elm.idKhoa})"
                                 style="margin-right: 5px;" type="button" data-bs-toggle="modal" data-bs-target="#myModalUpdate"><i
                                        class="fa-solid fa-wrench"></i>
                                </a>
                            </td>
                        </tr>`;
      });

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
