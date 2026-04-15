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


