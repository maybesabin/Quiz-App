import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
//dotted background
//options ko size
const Review = () => {
    const location = useLocation();
    const { questions } = location.state as { questions: QuizQuestion[] };
    const optionStyles = (option: string, correctAnswer: string) => {
        if (option === correctAnswer) {
            return "bg-green-800";
        } else {
            return "bg-red-800";
        }
    };

    interface QuizQuestion {
        category: string;
        type: string;
        difficulty: string;
        question: string;
        correctAnswer: string;
        incorrectAnswers: string[];
    }

    return (
        <div className="flex items-center justify-center h-screen w-screen overflow-x-hidden">
            <div className="flex flex-col items-start justify-start p-12 h-full md:w-[60rem] w-full">
                <Link className="pb-6 text-xs text-zinc-400 font-semibold" to="/">&lt; Return to homepage</Link>
                <h1 className="text-4xl pb-12 font-semibold">Review</h1>
                {questions.map((question, index) => {
                    const correctAnswer = question.correctAnswer;
                    const options = [...question.incorrectAnswers, correctAnswer].sort();

                    return (
                        <div key={index} className="flex flex-col gap-6 mb-8">
                            <h1 className="font-semibold text-2xl">{index + 1}: {question.question}</h1>
                            <div className="flex items-center gap-6 flex-wrap pb-12">
                                {options.map((option, optionIndex) => (
                                    <Button
                                        key={optionIndex}
                                        className={`
                                        min-h-12 md:text-[1rem] flex items-center justify-center flex-wrap text-xs md:max-w-[400px] max-w-[300px]    
                                        ${optionStyles(option, correctAnswer)}`}
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Review;