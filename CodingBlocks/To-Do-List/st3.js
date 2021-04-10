function TaskList() {
    "use strict";

    function setAppStatus($status) {

        var $appStatusElm = document.querySelector(".app-status");

        $appStatusElm.textContent = $status;


    }

    function addTask() {

        var $addNewTask = document.querySelector("#add-new-task");

        var $button = document.querySelector("#add-task");

        $button.addEventListener("click",function() {
            var taskName=$addNewTask.value;
            appendNewTask(taskName);
            $addNewTask.value='';
            return false;
        });

    }

    function appendNewTask(taskName) {

        var $taskList = document.querySelector("#tasks-list");
        var $taskElm = document.createElement("li");
        var $btnsWrapper = document.createElement("div");
        var $deleteBtn = document.createElement('button');
        var $moveUpBtn = document.createElement('button');
        var $moveDownBtn = document.createElement('button');
        var $taskNameElm = document.createElement('span');
        var hrefAttr = document.createAttribute("href");
        var buttons = [];

        hrefAttr.nodeValue = "#";

        $btnsWrapper.classList.add("bg-info");
        $deleteBtn.classList.add("btn");
        $deleteBtn.classList.add("btn-danger");

        $moveUpBtn.classList.add("btn");
        $moveUpBtn.classList.add("btn-info");

        $moveDownBtn.classList.add("btn");
        $moveDownBtn.classList.add("btn-warning");

        $taskNameElm.textContent = taskName;
        $taskList.appendChild($taskElm);
        $taskElm.appendChild($btnsWrapper);

        $deleteBtn.textContent = "X";
        var $deleteBtnHref = hrefAttr.cloneNode(true);
        $deleteBtn.setAttributeNode($deleteBtnHref);
        $deleteBtn.addEventListener('click', function (e) {
            $(this).parent().remove();
        });

        $moveUpBtn.innerHTML = "&uarr;";
        var $moveUpBtnHref = hrefAttr.cloneNode(true);
        $moveUpBtn.setAttributeNode($moveUpBtnHref);
        $moveUpBtn.addEventListener('click', function (e) {
            var $mvTaskList = e.target.closest('ul');
            var $mvTask = e.target.closest('li');
            var $prevTask = e.target.closest('li').previousSibling;
            if (typeof ($prevTask) !== 'undefined' && $prevTask !== null) {
                $mvTaskList.insertBefore($mvTask, $prevTask);
            }
        });

        $moveDownBtn.innerHTML = "&darr;";
        var $moveDownBtnHref = hrefAttr.cloneNode(true);
        $moveDownBtn.setAttributeNode($moveDownBtnHref);

        $moveDownBtn.addEventListener('click', function (e) {
            var wrapper = $(this).parent().closest('li')
            wrapper.insertAfter(wrapper.next())
        })

        buttons = [$deleteBtn, $moveUpBtn,$moveDownBtn ];

        buttons.forEach(function (btn) {
            $taskElm.appendChild(btn);
        });
        $taskElm.appendChild($taskNameElm);
        $taskElm.classList.add("bg-row");
        $taskElm.classList.add("p-2");
        $taskElm.classList.add("list-group-item")



    }

    this.start = function () {
        appendNewTask("Learn React");
        appendNewTask("GO to gym");
        appendNewTask("go to shopping");
        appendNewTask("buy groceries")
        addTask();
    };
}


var app = new TaskList();
app.start();
