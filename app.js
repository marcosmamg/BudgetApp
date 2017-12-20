//BUDGET CONTROLLER
var  budgetController = (function(){
    var Expense = function(id, description, value){
        this.id = id;
        this.descrition = description;
        this.value = value;
    };
    
    var Income = funciton(id, description, value){
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
})();

//UI CONTROLLER
var UIController = (function(){
    
    var DOMString = {
        inputType: '.add__type',
        inputDescription: 'add__description',
        inputValue: 'add__value',
        inputAddButton: 'add__btn'
    }
    return{
        getInput : function(){
            return{
                type: document.querySelector(DOMString.inputType).value,
                //inc or exp
                description: document.querySelector(DOMString.inputType).value,
                value: document.querySelector(DOMString.inputValue).value
            }
        },
        getDOMStrings: function(){
            return DOMString;   
        }          
        
    }
})();

//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){
    
    var setupEvenListeners = function(){
        
        var DOM = UICtrl.getDOMStrings(); 
        document.querySelector(DOM.inputAddButton).addEventListener("click", ctrlAddItem);
    
        document.addEventListener("keypress", function(event){        
            if (event.keyCode === 13 || event.which === 13){            controller();
            }
        });    
    }
    
    var ctrlAddItem = function(){
       // TODO: 
       var input = UICtrl.getInput();
        //2. Add the item to the budget controller
        //3. Add the item to the UI
        //4. Calculate the budget
        //5. Display the budget on the UI
   };
    
    return{
        init: function(){
            setupEvenListeners();
        }
    }
    
})(budgetController, UIController);

controller.init();