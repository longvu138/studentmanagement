const renderKyHoc = () => {
  fetch(`${HOST}/api/kyhoc`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      let i = 1;
      data.forEach((elm) => {
        html += `<tr>
                              <th scope="row">${i++}</th>
                              <td>${elm.tenKyHoc}</td>
                              <td>
                                  <a 
                                  onclick="openUpdateKyHoc(${elm.idky})"
                                   style="margin-right: 5px;" type="button" data-bs-toggle="modal" data-bs-target="#myModalUpdate"><i
                                          class="fa-solid fa-wrench"></i>
                                  </a>
                              </td>
                          </tr>`;
      });

      document.querySelector("#listHocKy").innerHTML = html;
    })
    .catch((err) => console.log("Error: ", err));
};

const openUpdateKyHoc = (id) => {
  fetch(`${HOST}/api/kyhoc/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("#formUpdate #maKy").value = data.idky;
      document.querySelector("#formUpdate #tenKyHoc").value = data.tenKyHoc;
    });
};