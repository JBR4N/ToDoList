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

const Todo = () => {
  const [todo, setTodo] = useState([]);

  const { id } = useParams();

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
  }, []);

  console.log(todo);

  return (
    <div>
      <div>
        <Card className="w-[750px]">
          <CardHeader>
            <CardTitle>{todo.title}</CardTitle>
            <CardDescription>{todo.date}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-10">
            <p>{todo.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <h1>Made with ♥ by Mario Inguito</h1>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Todo;
