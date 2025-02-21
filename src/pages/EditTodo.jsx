import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useLocation } from "react-router-dom";

const EditTodo = () => {
  const location = useLocation();
  const { todo } = location.state;

  // Log the received data to ensure it is received correctly
  console.log("Received todo data:", todo);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setDate(todo.date);
    }
  }, [todo]);

  // Log the state to ensure it is being set correctly
  useEffect(() => {
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Date:", date);
  }, [title, description, date]);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/todolist/${todo.id}`,
        {
          title,
          description,
          date,
        }
      );

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <Card className="w-[750px]">
          <CardHeader>
            <CardTitle>Edit To Do</CardTitle>
            <CardDescription>
              Update the fields to edit the to do
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col py-10 gap-y-5 w-full">
            <div className="gap-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="gap-y-2">
              <Label>To do Description</Label>
              <textarea
                className="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="gap-y-2">
              <Label>Date</Label>
              <Input value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <Button onClick={handleSubmit}>Save Changes</Button>
          </CardContent>
          <CardFooter className="flex justify-between">
            <h1>Made with ♥ by JBR4N</h1>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default EditTodo;
