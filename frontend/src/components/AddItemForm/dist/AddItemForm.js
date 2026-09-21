"use strict";
exports.__esModule = true;
var react_1 = require("react");
// interface AddItemFormProps {
//     onAddItem: (item: any) => void; // Callback to handle the new item
// }
// { onAddItem }
var AddItemForm = function () {
    var _a = react_1.useState(''), name = _a[0], setName = _a[1];
    var _b = react_1.useState(''), description = _b[0], setDescription = _b[1];
    var _c = react_1.useState(1), quantity = _c[0], setQuantity = _c[1];
    var _d = react_1.useState(false), status = _d[0], setStatus = _d[1];
    var _e = react_1["default"].useState(false), addItem = _e[0], setAddItem = _e[1];
    var handleAddItem = function () {
        setAddItem(function (addItem) { return !addItem; });
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        var newItem = {
            id: Date.now(),
            name: name,
            description: description,
            quantity: quantity,
            status: status
        };
        console.log('New Item:', newItem);
        // onAddItem(newItem);
        // Reset form
        setName('');
        setDescription('');
        setQuantity(1);
        setStatus(false);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("button", { className: 'btn btn-success', onClick: handleAddItem }, "Add item"),
        addItem &&
            react_1["default"].createElement("div", { className: 'position-fixed z-3 top-50 start-50 translate-middle w-75' },
                react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "bg-dark container d-flex flex-column align-items-start justify-content-center flex-wrap p-5 grid gap-3 rounded-2 w-50" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("h1", { className: 'text-light' }, "Add Item")),
                    react_1["default"].createElement("div", { className: "form-group w-100 text-light" },
                        react_1["default"].createElement("label", { htmlFor: "itemName" }, "Item Name"),
                        react_1["default"].createElement("input", { type: "text", id: "itemName", value: name, onChange: function (e) { return setName(e.target.value); }, placeholder: "Enter item name", className: 'form-control', required: true })),
                    react_1["default"].createElement("div", { className: "form-group w-100 text-light" },
                        react_1["default"].createElement("label", { htmlFor: "description" }, "Description"),
                        react_1["default"].createElement("textarea", { className: 'form-control', id: "description", value: description, onChange: function (e) { return setDescription(e.target.value); }, placeholder: "Enter item description", rows: 2 })),
                    react_1["default"].createElement("div", { className: "form-group w-100 text-light" },
                        react_1["default"].createElement("label", { htmlFor: "quantity" }, "Quantity"),
                        react_1["default"].createElement("input", { type: "number", className: 'form-control', id: "quantity", value: quantity, onChange: function (e) { return setQuantity(Number(e.target.value)); }, min: 1, required: true })),
                    react_1["default"].createElement("div", { className: "form-group w-100 text-light" },
                        react_1["default"].createElement("label", { className: '' },
                            react_1["default"].createElement("input", { type: "checkbox", checked: status, onChange: function (e) { return setStatus(e.target.checked); } }),
                            "Purchased")),
                    react_1["default"].createElement("div", { className: 'd-flex gap-2' },
                        react_1["default"].createElement("button", { type: "submit", className: "btn btn-success" }, "Add Item"),
                        react_1["default"].createElement("button", { className: "btn btn-light", onClick: handleAddItem }, "Cancel"))))));
};
exports["default"] = AddItemForm;
