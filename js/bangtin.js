// Bảng tin
const renderBangTin = () => {
  fetch(`${HOST}/api/bangtin`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      let i = 1;
      data.forEach((elm) => {
        html += `<tr">
                            <th style="text-align:center"  scope="row" >${i++}</th>
                            <td  style="text-align:center" >${formatDate(
                              elm.thoiGianTao
                            )}</td>
                            <td >${elm.noiDung}</td>
                            <td>
                               <a type="button" onClick=deleteBangTin(${
                                 elm.idbt
                               }) ><i class="fa-solid fa-trash"></i>
                               </a>
                            </td>
                        </tr>
                    
                        
                        `;
      });

      document.querySelector("#listBangTin").innerHTML = html;
    })
    .catch((err) => console.log("Error: ", err));
};

const deleteBangTin = (id) => {
  result = window.confirm("bạn có muốn xoá không?");
  if (result === true) {
    fetch(`${HOST}/api/bangtin/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Xoá thành công");
        renderBangTin();
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

//
