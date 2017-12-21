//BUDGET CONTROLLER
var  budgetController = (function(){
    var Expense = function(id, description, value){
        this.id = id;
        this.descrition = description;
        this.value = value;
    };
    
    var Income = function(id, description, value){
        this.id = id;
        this.descrition = description;
        this.value = value;
    };
    
    var data = {
        allItems:{
            exp : [],
            inc: []
        },
        total:{
            exp: 0,
            inc: 0
        }
    }
    
    return{
        addItem: function(type, des, val){           
            var newItem, ID;
            //Create new ID
            ID = data.allItems[type].length > 0 ? data.allItems[type][data.allItems[type].length - 1].id + 1 : 0;
            //Create new item based on type: inc, exp
            if (type === 'exp'){
                newItem = new Expense(ID, des, val);
            }else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }
            //Publish item on public data structure
            data.allItems[type].push(newItem);
            
            return newItem;
        },
        
        printItem: function(){
            console.log(data);
        }
    }
})();

//UI CONTROLLER
var UIController = (function(){
    
    var DOMString = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputAddButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }
    return{
        getInput : function(){
            return{
                type: document.querySelector(DOMString.inputType).value,
                //inc or exp
                description: document.querySelector(DOMString.inputDescription).value,
                value: parseFloat(document.querySelector(DOMString.inputValue).value)
            }
        },
        getDOMStrings: function(){
            return DOMString;   
        },
        addListItem: function(obj, type){
            var html, element;
            if(type === 'inc'){
                element = DOMString.incomeContainer;
                html = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';    
            }else if(type === 'exp'){
                element = DOMString.expensesContainer;
                html = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';    
            }
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.descrition);
            newHtml = newHtml.replace('%value%', obj.value);
            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        clearField: function(){            
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMString.inputDescription + ', ' + DOMString.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(curr, index, array){
                curr.value = "";
            });
            
            fieldsArr[0].focus();
        }
        
    }
})();

//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){
    
    var setupEvenListeners = function(){
        
        var DOM = UICtrl.getDOMStrings();   
        document.querySelector(DOM.inputAddButton).addEventListener("click", ctrlAddItem);
    
        document.addEventListener("keypress", function(event){        
            if (event.keyCode === 13 || event.which === 13){            ctrlAddItem();
            }
        });    
    }
    
    var ctrlAddItem = function(){
        var input, newItem;
       // TODO: 
        //Get the field input data
        input = UICtrl.getInput();       
        
        //2. Add the item to the budget controller
        if(input.description !== "" && input.value > 0 && !isNaN(input)){
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. Add the item to the UI
            UIController.addListItem(newItem, input.type);

            UIController.clearField();
        }            
            
        //4. Calculate and update the budget
        updateBudget();
   };
    
    var updateBudget = function(){
          
    };
    
    return{
        init: function(){
            setupEvenListeners();
        }
    }
    
})(budgetController, UIController);

controller.init();