import React, { useState } from "react";
import { useStore } from "../store/useStore";
import { vocabulary, topics } from "../data/vocabulary";
import { differenceInDays, isBefore, startOfDay } from "date-fns";
import {
  Calendar,
  CheckCircle,
  Clock,
  Star,
  Target,
  BookOpen,
  Brain,
  RefreshCw,
  Play,
  X,
  Check,
} from "lucide-react";

interface DashboardProps {
  onStartSession: (
    mode: "test" | "learn" | "revise" | "practice",
    words: any[],
  ) => void;
}

export function Dashboard({ onStartSession }: DashboardProps) {
  const { userWords, stats } = useStore();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [selectedPriorityDay, setSelectedPriorityDay] = useState<number | null>(
    null,
  );
  const [selectedWordsToRevise, setSelectedWordsToRevise] = useState<
    Set<string>
  >(new Set());
  const [showTopicSelector, setShowTopicSelector] = useState(false);
  const [selectedTopicDays, setSelectedTopicDays] = useState<
    { topicId: string; day: number }[]
  >([]);

  const today = new Date();
  const startDate = new Date("2026-03-09");
  const examDate1 = new Date("2026-05-18");
  const examDate2 = new Date("2026-06-09");

  const daysLeft1 = differenceInDays(examDate1, today);
  const daysLeft2 = differenceInDays(examDate2, today);
  const totalDays = differenceInDays(examDate1, startDate);
  const currentDay = differenceInDays(today, startDate) + 1;

  const getDaysUntilReview = (nextReviewDate: string | null) => {
    if (!nextReviewDate) return "Mastered";
    const days = differenceInDays(startOfDay(new Date(nextReviewDate)), startOfDay(today));
    if (days < 0) return "Overdue";
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    return `Due in ${days} days`;
  };

  // Calculate box counts
  const boxCounts = [0, 0, 0, 0, 0, 0, 0];
  let toReviseCount = 0;

  Object.values(userWords).forEach((uw) => {
    boxCounts[uw.box]++;
    if (uw.nextReviewDate && isBefore(new Date(uw.nextReviewDate), today)) {
      toReviseCount++;
    }
  });

  const unlearnedWords = vocabulary.filter((w) => !userWords[w.id]);
  boxCounts[0] = unlearnedWords.length;

  const unlearnedByDay = unlearnedWords.reduce(
    (acc, word) => {
      if (!acc[word.day]) {
        acc[word.day] = [];
      }
      acc[word.day].push(word);
      return acc;
    },
    {} as Record<number, typeof vocabulary>,
  );

  const nextPriorityDays = Object.keys(unlearnedByDay)
    .map(Number)
    .sort((a, b) => a - b)
    .slice(0, 3);

  const handleTest = () => {
    // Test: next set of words from Box 0, sorted by priority group (day)
    const nextWords = unlearnedWords.sort((a, b) => a.day - b.day).slice(0, 20); // 20 words per session
    if (nextWords.length > 0) {
      onStartSession("test", nextWords);
    } else {
      alert("No more new words to test!");
    }
  };

  const handleLearn = () => {
    // Learn: words in Box 1
    const learnWords = vocabulary
      .filter((w) => userWords[w.id]?.box === 1)
      .slice(0, 20);
    if (learnWords.length > 0) {
      onStartSession("learn", learnWords);
    } else {
      alert("No words to learn right now!");
    }
  };

  const handleRevise = () => {
    // Revise: words whose time is up
    const reviseWords = vocabulary
      .filter((w) => {
        const uw = userWords[w.id];
        return (
          uw &&
          uw.nextReviewDate &&
          isBefore(new Date(uw.nextReviewDate), today) &&
          uw.box > 1 &&
          uw.box < 6
        );
      })
      .slice(0, 20);

    if (reviseWords.length > 0) {
      onStartSession("revise", reviseWords);
    } else {
      alert("No words to revise right now!");
    }
  };

  const handleChooseOwn = () => {
    setShowTopicSelector(true);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Star className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Points</p>
            <p className="text-2xl font-bold text-gray-900">{stats.points}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Time Spent</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatTime(stats.timeSpent)}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
            <Target className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Words Mastered</p>
            <p className="text-2xl font-bold text-gray-900">{boxCounts[6]}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl">
            <RefreshCw className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">To Revise</p>
            <p className="text-2xl font-bold text-gray-900">{toReviseCount}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Learning Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleTest}
                className="group relative overflow-hidden bg-indigo-600 p-6 rounded-2xl text-left hover:bg-indigo-700 transition-colors"
              >
                <div className="relative z-10">
                  <Play className="w-8 h-8 text-indigo-200 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-1">
                    Test New Words
                  </h3>
                  <p className="text-indigo-200 text-sm">
                    Learn priority words for today
                  </p>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform">
                  <Play className="w-32 h-32 text-white" />
                </div>
              </button>

              <button
                onClick={handleLearn}
                className="group relative overflow-hidden bg-rose-500 p-6 rounded-2xl text-left hover:bg-rose-600 transition-colors"
              >
                <div className="relative z-10">
                  <Brain className="w-8 h-8 text-rose-200 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-1">
                    Learn Mistakes
                  </h3>
                  <p className="text-rose-200 text-sm">
                    {boxCounts[1]} words need attention
                  </p>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform">
                  <Brain className="w-32 h-32 text-white" />
                </div>
              </button>

              <button
                onClick={handleRevise}
                className="group relative overflow-hidden bg-emerald-500 p-6 rounded-2xl text-left hover:bg-emerald-600 transition-colors"
              >
                <div className="relative z-10">
                  <RefreshCw className="w-8 h-8 text-emerald-200 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-1">
                    Revise Due
                  </h3>
                  <p className="text-emerald-200 text-sm">
                    {toReviseCount} words ready for review
                  </p>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform">
                  <RefreshCw className="w-32 h-32 text-white" />
                </div>
              </button>

              <button
                onClick={handleChooseOwn}
                className="group relative overflow-hidden bg-slate-800 p-6 rounded-2xl text-left hover:bg-slate-900 transition-colors"
              >
                <div className="relative z-10">
                  <BookOpen className="w-8 h-8 text-slate-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-1">
                    Choose Topic
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Focus on specific areas
                  </p>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-32 h-32 text-white" />
                </div>
              </button>
            </div>
          </div>

          {/* Next Up */}
          {nextPriorityDays.length > 0 && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Next up</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {nextPriorityDays.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedPriorityDay(day)}
                    className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-left hover:bg-indigo-100 transition-colors"
                  >
                    <p className="text-sm font-bold text-indigo-500 uppercase tracking-wider mb-1">
                      Day {day}
                    </p>
                    <p className="text-lg font-bold text-indigo-900">
                      {unlearnedByDay[day].length} words
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Leitner Boxes */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Leitner Boxes
            </h2>
            <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 snap-x">
              {[0, 1, 2, 3, 4, 5, 6].map((box) => {
                const colors = [
                  "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200", // 0: Untested (Gray)
                  "bg-red-100 text-red-600 border-red-200 hover:bg-red-200", // 1: Box 1 (Red)
                  "bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-200", // 2: Box 2 (Orange)
                  "bg-amber-100 text-amber-600 border-amber-200 hover:bg-amber-200", // 3: Box 3 (Yellow/Amber)
                  "bg-green-100 text-green-600 border-green-200 hover:bg-green-200", // 4: Box 4 (Green)
                  "bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200", // 5: Box 5 (Blue)
                  "bg-purple-100 text-purple-600 border-purple-200 hover:bg-purple-200", // 6: Mastered (Purple)
                ];
                
                return (
                  <div
                    key={box}
                    onClick={() => {
                      setSelectedBox(box);
                      const wordsInBox = vocabulary.filter((w) => {
                        if (box === 0) return !userWords[w.id];
                        return userWords[w.id]?.box === box;
                      });
                      setSelectedWordsToRevise(new Set(wordsInBox.map(w => w.id)));
                    }}
                    className={`min-w-[120px] shrink-0 p-4 rounded-2xl border text-center cursor-pointer transition-colors snap-start ${colors[box]}`}
                  >
                    <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                      {box === 0
                        ? "Untested"
                        : box === 6
                          ? "Mastered"
                          : `Box ${box}`}
                    </p>
                    <p className="text-2xl font-bold">
                      {boxCounts[box]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Snapshot Widget */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Snapshot</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Time Spent</span>
                <span className="font-bold text-gray-900">
                  {formatTime(stats.timeSpent)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Words Learnt</span>
                <span className="font-bold text-gray-900">
                  {stats.wordsLearnt}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Words Revised</span>
                <span className="font-bold text-gray-900">
                  {stats.wordsRevised}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Words Finished</span>
                <span className="font-bold text-gray-900">
                  {stats.wordsFinished}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Points Earnt</span>
                <span className="font-bold text-gray-900">{stats.points}</span>
              </div>
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Exam Countdown
              </h2>
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
              >
                <Calendar className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {showCalendar ? (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-500 mb-2">
                    <div>M</div>
                    <div>T</div>
                    <div>W</div>
                    <div>T</div>
                    <div>F</div>
                    <div>S</div>
                    <div>S</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {Array.from({ length: 90 }).map((_, i) => {
                      const day = i + 1;
                      const isPast = day < currentDay;
                      const isToday = day === currentDay;
                      
                      const dayWords = vocabulary.filter(w => w.day === day);
                      const hasWords = dayWords.length > 0;
                      const allTested = hasWords && dayWords.every(w => userWords[w.id] && userWords[w.id].box > 0);
                      const allMastered = hasWords && dayWords.every(w => userWords[w.id] && userWords[w.id].box === 6);

                      let bgColor = isPast
                        ? "bg-indigo-100 text-indigo-400"
                        : "bg-white border border-slate-200 text-slate-400";

                      if (day === 70 || day === 90) {
                        bgColor = isPast 
                          ? "bg-red-100 text-red-500 font-bold" 
                          : "bg-red-50 border border-red-200 text-red-600 font-bold";
                      }

                      if (allMastered) {
                        bgColor = "bg-amber-400 text-white font-bold border-amber-500";
                      } else if (allTested) {
                        bgColor = "bg-emerald-500 text-white font-bold border-emerald-600";
                      }

                      if (isToday) {
                        if (!allMastered && !allTested) {
                          bgColor = "bg-indigo-600 text-white font-bold";
                        } else {
                          bgColor += " ring-2 ring-indigo-600 ring-offset-1";
                        }
                      }

                      return (
                        <div
                          key={i}
                          className={`aspect-square rounded-md flex flex-col items-center justify-center text-xs relative ${bgColor}`}
                        >
                          <span>{day}</span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-center text-xs text-slate-500 mt-4">
                    90 Days to Paper 2
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-500">
                        Paper 1 (May 18)
                      </span>
                      <span className="font-bold text-indigo-600">
                        {daysLeft1} days
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{
                          width: `${Math.max(0, Math.min(100, (currentDay / totalDays) * 100))}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-500">
                        Paper 2 (Jun 9)
                      </span>
                      <span className="font-bold text-indigo-600">
                        {daysLeft2} days
                      </span>
                    </div>
                  </div>
                </>
              )}

              {boxCounts[0] === 0 &&
              boxCounts[1] === 0 &&
              boxCounts[2] === 0 &&
              boxCounts[3] === 0 &&
              boxCounts[4] === 0 &&
              boxCounts[5] === 0 &&
              boxCounts[6] > 0 ? (
                <div className="flex items-center gap-3 p-4 bg-amber-50 text-amber-700 rounded-xl border border-amber-200">
                  <Star className="w-6 h-6 fill-current" />
                  <span className="font-bold">All topics mastered!</span>
                </div>
              ) : (
                <div className="text-sm text-gray-600 text-center p-4 bg-slate-50 rounded-xl">
                  You have{" "}
                  <span className="font-bold text-gray-900">
                    {toReviseCount + boxCounts[1]}
                  </span>{" "}
                  words to test yourself on and{" "}
                  <span className="font-bold text-gray-900">
                    {unlearnedWords.filter((w) => w.day <= currentDay).length}
                  </span>{" "}
                  words to cover today's priority words.
                </div>
              )}
            </div>
          </div>

          {/* Topics Overview removed from sidebar */}
        </div>
      </div>

      {/* Topics & Priority Days Grid */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Topics & Priority Days</h2>
          {selectedTopicDays.length > 0 && (() => {
            const wordsToTest = vocabulary.filter(w => 
              selectedTopicDays.some(td => td.topicId === w.topicId && td.day === w.day)
            );
            const uniqueChapters = new Set(selectedTopicDays.map(td => td.topicId)).size;
            return (
              <button
                onClick={() => {
                  onStartSession("test", wordsToTest);
                  setSelectedTopicDays([]);
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
              >
                Test these chosen ones ({uniqueChapters} chapter{uniqueChapters === 1 ? '' : 's'}, {wordsToTest.length} word{wordsToTest.length === 1 ? '' : 's'})
              </button>
            );
          })()}
        </div>
        <div className="flex overflow-x-auto pb-4 gap-6 snap-x">
          {topics.map((topic) => {
            const topicWords = vocabulary.filter((w) => w.topicId === topic.id);
            const uniqueDays = Array.from(new Set(topicWords.map((w) => w.day))).sort((a, b) => a - b);
            
            return (
              <div key={topic.id} className="flex flex-col gap-3 min-w-[180px] shrink-0 snap-start">
                <div 
                  className="font-bold text-sm text-gray-900 cursor-pointer hover:text-indigo-600 line-clamp-2 h-10"
                  onClick={() => setSelectedTopic(topic.id)}
                  title={topic.name}
                >
                  {topic.name}
                </div>
                <div className="grid grid-cols-5 gap-1.5 w-fit">
                  {uniqueDays.map(day => {
                    const dayWords = topicWords.filter(w => w.day === day);
                    const isLearned = dayWords.length > 0 && dayWords.every(w => userWords[w.id] && userWords[w.id].box > 0);
                    const isSelected = selectedTopicDays.some(td => td.topicId === topic.id && td.day === day);
                    
                    return (
                      <button
                        key={day}
                        onClick={() => {
                          setSelectedTopicDays(prev => {
                            const exists = prev.some(td => td.topicId === topic.id && td.day === day);
                            if (exists) return prev.filter(td => !(td.topicId === topic.id && td.day === day));
                            return [...prev, { topicId: topic.id, day }];
                          });
                        }}
                        className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold transition-all ${
                          isSelected 
                            ? "bg-indigo-600 text-white ring-2 ring-indigo-300 ring-offset-1 scale-110" 
                            : isLearned
                              ? "bg-emerald-500 text-white hover:bg-emerald-600"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        title={`Day ${day}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Topic Modal */}
      {selectedTopic && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {topics.find((t) => t.id === selectedTopic)?.name} Words
              </h2>
              <button
                onClick={() => setSelectedTopic(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 space-y-2 pr-2">
              {vocabulary
                .filter((w) => w.topicId === selectedTopic)
                .map((w) => {
                  const uw = userWords[w.id];
                  const isLearnt = uw && uw.box > 0;
                  return (
                    <div
                      key={w.id}
                      className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100"
                    >
                      <div>
                        <p className="font-bold text-gray-900">{w.german}</p>
                        <p className="text-sm text-gray-600">{w.english}</p>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${isLearnt ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}`}
                        >
                          {isLearnt ? `Box ${uw.box}` : "Untested"}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Box Modal */}
      {selectedBox !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedBox === 0
                    ? "Untested"
                    : selectedBox === 6
                      ? "Mastered"
                      : `Box ${selectedBox}`}{" "}
                  Words
                </h2>
                {boxCounts[selectedBox] > 0 && (
                  <button
                    onClick={() => {
                      const wordsInBox = vocabulary.filter((w) => {
                        if (selectedBox === 0) return !userWords[w.id];
                        return userWords[w.id]?.box === selectedBox;
                      });
                      if (selectedWordsToRevise.size === wordsInBox.length) {
                        setSelectedWordsToRevise(new Set());
                      } else {
                        setSelectedWordsToRevise(new Set(wordsInBox.map(w => w.id)));
                      }
                    }}
                    className="text-sm font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1 rounded-full transition-colors"
                  >
                    {selectedWordsToRevise.size === boxCounts[selectedBox] ? "Deselect All" : "Select All"}
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setSelectedBox(null);
                  setSelectedWordsToRevise(new Set());
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 space-y-2 mb-6 pr-2">
              {vocabulary
                .filter((w) => {
                  if (selectedBox === 0) return !userWords[w.id];
                  return userWords[w.id]?.box === selectedBox;
                })
                .map((w) => {
                  const isSelected = selectedWordsToRevise.has(w.id);
                  return (
                    <div
                      key={w.id}
                      className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer border-2 transition-colors ${isSelected ? "border-indigo-500 bg-indigo-50" : "border-transparent bg-slate-50 hover:bg-slate-100"}`}
                      onClick={() => {
                        const next = new Set(selectedWordsToRevise);
                        if (next.has(w.id)) next.delete(w.id);
                        else next.add(w.id);
                        setSelectedWordsToRevise(next);
                      }}
                    >
                      <div
                        className={`w-6 h-6 shrink-0 rounded border-2 flex items-center justify-center transition-colors ${isSelected ? "bg-indigo-500 border-indigo-500 text-white" : "border-gray-300 bg-white"}`}
                      >
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{w.german}</p>
                        <p className="text-sm text-gray-600">{w.english}</p>
                      </div>
                      {selectedBox > 0 && selectedBox < 6 && (
                        <div className="ml-auto text-right">
                          <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                            !userWords[w.id]?.nextReviewDate 
                              ? "bg-gray-100 text-gray-600"
                              : differenceInDays(startOfDay(new Date(userWords[w.id].nextReviewDate!)), startOfDay(today)) <= 0
                                ? "bg-rose-100 text-rose-700"
                                : "bg-emerald-100 text-emerald-700"
                          }`}>
                            {getDaysUntilReview(userWords[w.id]?.nextReviewDate || null)}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              {boxCounts[selectedBox] === 0 && (
                <p className="text-center text-gray-500 py-8">
                  No words in this box.
                </p>
              )}
            </div>
            <button
              disabled={selectedWordsToRevise.size === 0}
              onClick={() => {
                const wordsToRevise = vocabulary.filter((w) =>
                  selectedWordsToRevise.has(w.id),
                );
                let mode: "test" | "learn" | "revise" | "practice" = "practice";
                if (selectedBox === 1) mode = "learn";
                else if (selectedBox > 1 && selectedBox < 6) mode = "revise";
                
                onStartSession(mode, wordsToRevise);
                setSelectedBox(null);
                setSelectedWordsToRevise(new Set());
              }}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
            >
              {selectedBox === 1 || (selectedBox > 1 && selectedBox < 6) ? "Test yourself" : "Practice Selected"} ({selectedWordsToRevise.size})
            </button>
          </div>
        </div>
      )}
      {/* Priority Day Modal */}
      {selectedPriorityDay !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Day {selectedPriorityDay} Priority Words
              </h2>
              <button
                onClick={() => setSelectedPriorityDay(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 space-y-2 mb-6 pr-2">
              {unlearnedByDay[selectedPriorityDay]?.map((w) => (
                <div
                  key={w.id}
                  className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div>
                    <p className="font-bold text-gray-900">{w.german}</p>
                    <p className="text-sm text-gray-600">{w.english}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-200 text-gray-600">
                      Untested
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                const wordsToTest = unlearnedByDay[selectedPriorityDay].slice(0, 20);
                onStartSession("test", wordsToTest);
                setSelectedPriorityDay(null);
              }}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors"
            >
              Test these words
            </button>
          </div>
        </div>
      )}
      {/* Choose Topic Modal */}
      {showTopicSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Choose Topic to Test</h2>
              <button
                onClick={() => setShowTopicSelector(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 space-y-2 pr-2">
              {topics.map(topic => {
                const unlearnedCount = vocabulary.filter(w => w.topicId === topic.id && !userWords[w.id]).length;
                return (
                  <button
                    key={topic.id}
                    onClick={() => {
                      const topicWords = vocabulary.filter(w => w.topicId === topic.id && !userWords[w.id]);
                      if (topicWords.length > 0) {
                        onStartSession("test", topicWords.slice(0, 20));
                        setShowTopicSelector(false);
                      } else {
                        alert("You have already learned all words in this topic!");
                      }
                    }}
                    className="w-full text-left p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors"
                  >
                    <div className="font-bold text-gray-900">{topic.name}</div>
                    <div className="text-sm text-gray-500">
                      {unlearnedCount} untested words
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
