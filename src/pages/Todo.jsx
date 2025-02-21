import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [todo, setTodo] = useState({});

  const { id } = useParams();

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/todolist/${id}`
      );

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    console.log("Navigating to edit with todo:", todo); // Log the data being passed
    navigate(`/editTodo/${id}`, { state: { todo } });
  };

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/todolist/${id}`
        );
        setTodo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodo();
  }, [id]);

  console.log(todo);

  return (
    <div>
      <div>
        <Card className="w-[750px]">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <h1>{todo.title}</h1>{" "}
              <div className="flex gap-2">
                <Button
                  onClick={handleDelete}
                  variant="destructive"
                  className="button hover:font-bold"
                >
                  Delete To Do
                </Button>
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  className="button hover:border-black"
                >
                  ✏️ Edit
                </Button>{" "}
              </div>
            </CardTitle>
            <CardDescription>{todo.date}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-10">
            <p>{todo.description}</p>
          </CardContent>

          <CardFooter className="flex justify-between">
            <h1>Made with ♥ by JBR4N</h1>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Todo;
