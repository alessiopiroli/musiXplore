"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { quizQuestions } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

type PlayerType = 'Socializer' | 'Achiever' | 'Explorer' | 'Killer';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: PlayerType}>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswer = (answerKey: string, type: PlayerType) => {
    setSelectedAnswer(answerKey);
    setTimeout(() => {
        setAnswers(prev => ({ ...prev, [currentQuestion]: type }));
        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            finishQuiz({ ...answers, [currentQuestion]: type });
        }
        setSelectedAnswer(null);
    }, 300);
  };

  const finishQuiz = (finalAnswers: {[key: string]: PlayerType}) => {
    const counts: Record<PlayerType, number> = {
      Socializer: 0,
      Achiever: 0,
      Explorer: 0,
      Killer: 0,
    };

    Object.values(finalAnswers).forEach(type => {
      counts[type]++;
    });

    const playerType = Object.keys(counts).reduce((a, b) => counts[a as PlayerType] > counts[b as PlayerType] ? a : b);

    localStorage.setItem('quizCompleted', 'true');
    localStorage.setItem('playerType', playerType);
    router.push('/');
  };

  const progress = (currentQuestion / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <Music className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-center font-headline text-2xl">Find Your Vibe</CardTitle>
          <CardDescription className="text-center">A few questions to personalize your journey.</CardDescription>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center font-semibold">{question.question}</p>
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(question.answers).map(([key, answer]) => (
              <Button
                key={key}
                variant="outline"
                size="lg"
                className={cn("h-auto justify-start whitespace-normal py-3", selectedAnswer === key ? 'bg-primary/20' : '')}
                onClick={() => handleAnswer(key, answer.type as PlayerType)}
              >
                <span className="font-bold mr-3">{key.toUpperCase()}.</span>
                <span>{answer.text}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
