import { Parent } from "./component/parent/parent";
import { TodoXContext } from "./context/todo-context";

export const App = () => {
  return (
    <div>
      <TodoXContext>
        <Parent />
      </TodoXContext>
    </div>
  );
}
