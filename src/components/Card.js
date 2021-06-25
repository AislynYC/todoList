/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Card.js
 *
 *
 *
 *
 */

import TodoItem from "../components/TodoItem.js";

import cStyle from "./style/Card.module.css";

function Card(props) {
  const {
    card,
    addTodoItem,
    deleteTodoItem,
    removeCard,
    addCard,
    updateTodoItemMessage,
    updateCardName,
    removeState,
  } = props;

  //REMOTE2: 上一層不傳cardKey，改為從 card 裡面取出 cardKey 使用
  const {cardKey} = card
  /*  addTodo()
        Purpose:    calls addTodoItem and pass in cardKey
        Effect:     Calls props function addTodoItem and pass in CardID
        Parameters: none
    */
  const addTodo = () => {
    addTodoItem(cardKey);
  };

  const updateCardNameWithTarget = (e) => {
    updateCardName(cardKey, e.target.value);
  };

  const removeCardWithKey = () => {
    removeCard(cardKey);
  };

  /*  deleteTodoItemWithKey()
        Purpose:    calls deleteTodoItem and pass in cardKey
        Effect:     Calls props function deleteTodoItem and pass in 
                    cardKey with received arguments todoItemKey
        Parameters: int todoItemKey - the identifier to the todoItem that will
                                      be changed 
    */
  const deleteTodoItemWithKey = (todoItemKey) => {
    deleteTodoItem(cardKey, todoItemKey);
  };

  /*  updateTodoItemMessageWithKey()
        Purpose:    calls updateTodoItemMessage and pass in cardKey
        Effect:     Calls props function updateTodoItemMessage and pass in 
                    cardKey with received arguments todoItemKey and message
        Parameters: int todoItemKey - the identifier to the todoItem that will
                                      be changed 
                    string message  - the message that needs to be saved
    */
  const updateTodoItemMessageWithKey = (todoItemKey, message) => {
    updateTodoItemMessage(cardKey, todoItemKey, message);
    console.log("what is the cardKey: ", cardKey);
  };

  /*  handleKeyDown()
        Purpose:    creates a new card when enter pressed
        Effect:     checks if key pressed is "Enter," addCard and blur if true
        Parameters: e - element
    */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addCard();
      e.target.blur();
    }
  };

  return (
    <div
      className={
        removeState ? cStyle.cardRemoveContainer : cStyle.cardContainer
      }
      /* onClick={async () => await props.removeCard(cardKey)} */
    >
      <div className={cStyle.titleContainer}>
        <input
          type="text"
          placeholder="Enter a name..."
          value={card.name}
          className={cStyle.titleInput}
          //REVIEW2: 可以這樣寫就好，參數可以不用再特別寫一次
          onChange={updateCardNameWithTarget}
          onKeyDown={handleKeyDown}
        />
        <div
          className={cStyle.addTodo}
          onClick={addTodo}
        >
          ＋
        </div>
      </div>

      <div className={cStyle.scrollableContainer}>
        {
          // REVIEW2: reference - Optional chaining
          card.todoList?.map(({message,todoItemKey}) => {
            //REVIEW2: reference - Destructuring assignment
            return (
              <TodoItem
                todo={message}
                todoItemKey={todoItemKey}
                key={todoItemKey}
                deleteTodoItem={deleteTodoItemWithKey}
                updateTodoItemMessage={updateTodoItemMessageWithKey}
                addTodo={addTodo}
              ></TodoItem>
            );
          })}
      </div>
      <div className={cStyle.removeOverlayContainer}>
        {//REVIEW2: 這邊可以這樣寫，就不需要 return 一個空 <span />
        removeState && (
          <div className={cStyle.removeOverlay} onClick={removeCardWithKey}>
            CLICK TO REMOVE
          </div>
        ) }
      </div>
    </div>
  );
}

export default Card;
