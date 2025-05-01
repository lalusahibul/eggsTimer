"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import * as React from 'react'
import { Progress } from '@/components/ui/progress';
import { SetStateAction, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import ImageCard from '@/components/ui/image-card';
import {
  HoverCard,
  HoverCardContent, 
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const First = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [timerRunning, setTimerRunning] = useState(false);
  const [duration, setDuration] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const progress = ((duration - remainingTime) / duration) * 100; 


  // Fungsi waktu real-time
  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  // Update jam sekarang setiap detik
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Mulai timer
 const startTimer = (minutes: number) => {
  const seconds = minutes * 60;
  setDuration(seconds);
  setRemainingTime(seconds);
  setTimerRunning(true);
};
  //timer berhenti
const stopTimer = () => {
  setTimerRunning(false);
  setDuration(0);
  setRemainingTime(0); // Atau bisa biarkan sisa waktu tetap
};
  // Jalankan timer countdown tanpa ganggu jam utama
  useEffect(() => {
    if (!timerRunning || duration <= 0) return;

    const intervalId = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setTimerRunning(false);
           setDialogOpen(true); //alert
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerRunning, duration]);
  
  return (
<>
<div className="flex items-center justify-center min-h-screen p-4 md:p-9">
  <div className="flex items-center justify-center min-h-screen p-9">
  <Card className="w-full max-w-[1000px] bg-yellow-300">
  <CardHeader>
    <CardTitle className="text-lg">Lets Cook Eggs</CardTitle>
    <CardDescription className="text-md">
      Choose your favorite boiled egg
    </CardDescription>
  </CardHeader>
  <CardContent className="flex flex-wrap justify-center items-center gap-6">
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex flex-col items-center">
          <ImageCard 
            caption="Runny Yolk" 
            className="p-4 w-full md:w-[210px] bg-purple-400" 
            imageUrl="/img/image1.png"
          ></ImageCard>
          <Button className="mt-2 bg-blue-300" onClick={() => startTimer(6)}>Start Boiling</Button>
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        A liquidy yolk and soft white. This is perfect for eggs served in an egg cup.
      </HoverCardContent>
    </HoverCard>
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex flex-col items-center">
          <ImageCard 
            caption="Soft Boiled" 
            className="p-4 w-full md:w-[210px] bg-purple-400" 
            imageUrl="/img/image2.png"
          ></ImageCard>
          <Button className="mt-2 bg-blue-300" onClick={() => startTimer(8)}>Start Boiling</Button>
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        A medium yolk that’s slightly soft but firm enough to hold its own.
      </HoverCardContent>
    </HoverCard>
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex flex-col items-center">
          <ImageCard 
            caption="Hard Boiled" 
            className="p-4 w-full md:w-[210px] bg-purple-400" 
            imageUrl="/img/image3.png"
          ></ImageCard>
          <Button className="mt-2 bg-blue-300" onClick={() => startTimer(10)}>Start Boiling</Button>
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        The early stages of a hard boiled egg, with just a smidge of softness in the middle.
      </HoverCardContent>
    </HoverCard>
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex flex-col items-center">
          <ImageCard 
            caption="Half Over Cooked" 
            className="p-4 w-full md:w-[210px] bg-purple-400" 
            imageUrl="/img/image4.png"
          ></ImageCard>
          <Button className="mt-2 bg-blue-300" onClick={() => startTimer(12)}>Start Boiling</Button>
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        Your traditional hard boiled egg with the lightest yolk and a firm white, but not overcooked.
      </HoverCardContent>
    </HoverCard>
  </CardContent>
  <CardContent className="flex justify-center items-center gap-4">
    <Card className="w-full max-w-[300px] bg-green-400">
      <CardContent className="flex justify-center items-center gap-4">
    <p className="text-2xl text-black-700">Current Time</p>
      </CardContent>
      <CardContent className="flex justify-center items-center gap-4">
    <p className="text-2xl text-black">{getCurrentTime()}</p>
    </CardContent>
    <CardContent>
      </CardContent>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="text-lg">Time's up</AlertDialogTitle>
      <AlertDialogDescription className="text-lg">
        Your eggs are cooked!
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogAction onClick={() => setDialogOpen(false)} className="bg-blue-300">Close</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  <CardContent>
    <Progress value={progress} className="w-[100%]" />
  </CardContent>
  <CardContent>
  {timerRunning && (
  <Button onClick={stopTimer} size="sm" className="text-sm bg-blue-300">
    Stop Timer
  </Button>
)}
  </CardContent>
    </Card>
  </CardContent>
</Card>

  </div>
  </div>
</>
  );
};

export default First;
