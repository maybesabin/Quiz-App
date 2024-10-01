import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
const Homepage = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [category, setCategory] = useState<string | undefined>(undefined);
    const [difficulty, setDifficulty] = useState<string | undefined>(undefined);
    const [noOfQuestions, setNoOfQuestions] = useState<number>(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const settings = {
            noOfQuestions: noOfQuestions,
            category: category,
            difficulty: difficulty,
        }

        if (category == "" || difficulty == "" || noOfQuestions <= 0) {
            toast({
                description: "Please enter valid input",
            });
        }
        else {
            navigate("/quiz", { state: settings });
        }
    };

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <Toaster />
            <div className="flex items-center justify-center h-full w-[60rem]">
                <form onSubmit={handleSubmit} className="flex flex-col items-center md:justify-center justify-start h-full gap-12 w-full text-2xl md:pt-0 pt-[5rem]">
                    <h1 className="font-semibold text-4xl md:pb-12 pb-6">Setup Quiz</h1>
                    <div className="flex flex-col gap-5">
                        <label htmlFor="noOfQuestions">Number of Questions</label>
                        <Input
                            value={noOfQuestions}
                            onChange={(e) => setNoOfQuestions(Number(e.target.value))}
                            name="noOfQuestions"
                            type="text"
                            className="md:w-[400px] w-[350px] h-12"
                            placeholder="10"
                        />
                    </div>
                    <div className="flex flex-col gap-5">
                        <label htmlFor="category">Category</label>
                        <Select onValueChange={setCategory}>
                            <SelectTrigger className="md:w-[400px] w-[350px] h-12">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="History">History</SelectItem>
                                <SelectItem value="Science">Science</SelectItem>
                                <SelectItem value="geography">Geography</SelectItem>
                                <SelectItem value="Music">Music</SelectItem>
                                <SelectItem value="General Knowledge">General Knowledge</SelectItem>
                                <SelectItem value="Film & TV">Film & TV</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-5">
                        <label htmlFor="difficulty">Difficulty</label>
                        <Select onValueChange={setDifficulty}>
                            <SelectTrigger className="md:w-[400px] w-[350px] h-12">
                                <SelectValue placeholder="Select Difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit">Start Quiz</Button>
                </form>
            </div>
        </div>
    );
};

export default Homepage;
