// Button Status
const buttonsStatus = document.querySelectorAll("[button-status]");
if (buttonsStatus.length > 0) {
    let url = new URL(window.location.href);
    console.log(url);

    buttonsStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            if (status) {
                url.searchParams.set("status", status);
            }
            console.log(url);
        });
    });
}
const checkBoxMulti = document.querySelector("[checkbox-multi]");
if (checkBoxMulti) {
    const checkAll = checkBoxMulti.querySelector("input[name='checkAll']");//- Checkbox "Chọn tất cả"
    const inputsid = checkBoxMulti.querySelectorAll("input[name='ids']");//- Checkbox của từng sản phẩm

    inputcheckAll.addEventListener("click", function () {
        if (checkAll.checked) {
            inputsid.forEach(input => {
                input.checked = true; //- Chọn tất cả các checkbox sản phẩm
            });
        }
        else {
            inputsid.forEach(input => {
                input.checked = false; //- Bỏ chọn tất cả các checkbox sản phẩm
            });

        }
    });

    inputsid.forEach(input => {
        input.addEventListener("click", function () {
            const countChecked = checkBoxMulti.querySelectorAll("input[name='ids']:checked").length;//- Đếm số checkbox sản phẩm đang được chọn
            if (countChecked === inputsid.length) {
                checkAll.checked = true; //- Nếu tất cả checkbox sản phẩm đều được chọn, thì checkbox "Chọn tất cả" cũng được chọn
            }
            else {
                checkAll.checked = false; //- Nếu có ít nhất một checkbox sản phẩm không được chọn, thì checkbox "Chọn tất cả" sẽ không được chọn
            }

        });
    });
}

const formChangeMulti = document.querySelector("[from-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", function (event) {
        event.preventDefault(); //- Ngăn chặn hành vi mặc định của form (gửi dữ liệu và tải lại trang)
        const checkBoxMulti = document.querySelector("[checkbox-multi]");
        const inputChecked = checkBoxMulti.querySelectorAll("input[name='ids']:checked");//- Lấy tất cả checkbox sản phẩm đang được chọn
        if (inputChecked.length > 0) {
            let ids = [];
            const inputids = formChangeMulti.querySelector("input[name='ids']"); //- Input ẩn để chứa ID của các sản phẩm được chọn
            inputChecked.forEach(input => {
                ids.push(input.value); //- Thêm giá trị của checkbox (ID sản phẩm) vào mảng ids
            });
            inputids.value = ids.join(","); //- Gán giá trị của input ẩn là chuỗi các ID sản phẩm được chọn, cách nhau bằng dấu phẩy
            formChangeMulti.submit(); //- Gửi form sau khi đã gán giá trị cho input ẩn
        }
        else {
            alert("Vui lòng chọn ít nhất một sản phẩm để thực hiện thao tác!");
            //- Hiển thị thông báo nếu không có checkbox sản phẩm nào được chọn
        }
    });
}
if (inputChecked.length > 0) {
    let ids = [];
    const inputids = formChangeMulti.querySelector("input[name='ids']");
    inputChecked.forEach(input => {
        if (typeChange === "change-position") {
            const positionInput = input.closest("tr").querySelector("input[name='position']").value;//- Lấy input vị trí trong cùng một hàng với checkbox
            ids.push(`${input.value}-${positionInput}`); //- Thêm giá trị của checkbox (ID sản phẩm) và vị trí vào mảng ids, cách nhau bằng dấu gạch ngang
        }
        else {
            ids.push(input.value);
        }
    });
}

// show alert message and auto hide after 5 seconds\
const showAlert = document.querySelectorAll(".alert");
if (showAlert.length > 0) {
    const time = showAlert.getAttribute("data-time") || 5000; //- Lấy thời gian từ thuộc tính data-time, nếu không có thì mặc định là 5000ms (5 giây)`
    setTimeout(() => {
        showAlert.classList.add("alert-hidden"); //- Thêm lớp "alert-hidden" để ẩn thông báo sau thời gian đã định
    }, time);
    const closeAlert = showAlert.querySelector(".close-alert"); //- Nút đóng thông báo
    if (closeAlert) {
        closeAlert.addEventListener("click", () => {
            showAlert.classList.add("alert-hidden"); //- Thêm lớp "alert-hidden" để ẩn thông báo khi người dùng nhấp vào nút đóng
        });
    }
    


}

// show alert message
