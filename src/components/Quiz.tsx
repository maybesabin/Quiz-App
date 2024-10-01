import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

const Quiz = () => {
    // get quiz settings
    const location = useLocation();
    const quizData = location.state;

    const { toast } = useToast();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);

    interface QuizQuestion {
        category: string;
        type: string;
        difficulty: string;
        question: string;
        correctAnswer: string;
        incorrectAnswers: string[];
    }

    const categoryMap: { [key: string]: string } = {
        "History": "History",
        "Science": "Science",
        "Geography": "Geography",
        "Music": "Music",
        "General Knowledge": "General Knowledge",
        "Film & TV": "Film & TV"
    };

    const formattedCategory = categoryMap[quizData.category.toLowerCase()] || quizData.category;

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(
                    `https://the-trivia-api.com/api/questions?limit=${quizData.noOfQuestions}&difficulty=${quizData.difficulty}&categories=${encodeURIComponent(formattedCategory)}`
                );

                setQuestions(response.data);

            } catch (error) {
                toast({
                    description: "Please enter valid input",
                });
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 1500)
            }
        };
        fetchQuestions();
    }, [quizData]);

    useEffect(() => {
        if (questions.length > 0 && currentQuestion < questions.length) {
            const currentQ = questions[currentQuestion];
            const allAnswers = [...currentQ.incorrectAnswers, currentQ.correctAnswer];
            setAnswers(shuffleArray(allAnswers));
        }
    }, [questions, currentQuestion]);

    const shuffleArray = (array: string[]) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const handleAnswerClick = (isTrue: boolean) => {
        if (isTrue) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizData.noOfQuestions) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    if (loading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center text-3xl">
                <HashLoader color="white" size={100} />
            </div>
        );
    }

    const handleReview = () => {
        const review = {
            questions
        }
        navigate('/review', { state: review });
    }

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <Toaster />
            <div className={`flex flex-col items-start justify-center gap-12 text-2xl ${showScore ? "w-auto" : "w-[60rem]"} h-[45rem] p-6`}>
                {showScore ? (
                    <div className="flex items-center flex-col gap-4">
                        <h1 className="text-4xl font-semibold">Your Score is {score}</h1>
                        <p className="text-[1rem] text-zinc-500 pb-5">{((score / questions.length) * 100).toFixed(2)}% accuracy</p>
                        <div className="flex items-center gap-6">
                            <Button><Link to="/">Play again?</Link></Button>
                            <Button onClick={handleReview}>Review answers</Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="pb-6 flex flex-col gap-4">
                            <h1 className="text-3xl">Question {currentQuestion + 1}/{quizData.noOfQuestions}</h1>
                            <p className="text-[1rem] text-zinc-400">{questions[currentQuestion].category}</p>
                        </div>

                        <div className="flex flex-col md:items-start items-center gap-12">
                            <h1 className="md:text-4xl text-3xl font-semibold">{questions[currentQuestion].question}</h1>
                            <div className="flex items-center gap-6 flex-wrap w-full">
                                {answers.map((item, index) => {
                                    return (
                                        <Button key={index} className="md:text-[1rem] text-xs" onClick={() => handleAnswerClick(item === questions[currentQuestion].correctAnswer)}>
                                            {item}
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Quiz;