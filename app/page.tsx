'use client';

import { useState } from 'react';
import { Upload, MessageSquare, FileText, Building, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

// Mock job descriptions - replace with actual API data
const jobDescriptions = [
  { id: '1', title: 'Senior Software Engineer' },
  { id: '2', title: 'Product Manager' },
  { id: '3', title: 'UX Designer' },
  { id: '4', title: 'Data Scientist' },
];

interface CandidateProfile {
  name: string;
  designation: string;
  company: string;
  experience: number;
  avatarUrl?: string;
}

interface Analysis {
  profile: CandidateProfile;
  selectionPercentage: number;
  riskScore: number;
  feedback: string;
}

export default function Home() {
  const [selectedJob, setSelectedJob] = useState('');
  const [resumes, setResumes] = useState<File[]>([]);
  const [selectedResume, setSelectedResume] = useState<File | null>(null);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResumes(Array.from(e.target.files));
    }
  };

  const handleResumeSelect = (resume: File) => {
    setSelectedResume(resume);
    // Mock API call - replace with actual API integration
    setAnalysis({
      profile: {
        name: "Sarah Anderson",
        designation: "Senior Software Engineer",
        company: "Tech Innovations Inc.",
        experience: 7,
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop"
      },
      selectionPercentage: 85,
      riskScore: 15,
      feedback: "Strong technical background with relevant experience. Good culture fit potential. Consider deep diving into system design experience during interview."
    });
  };

  const handleSendMessage = (message: string) => {
    setChatMessages([...chatMessages, { role: 'user', content: message }]);
    // Mock AI response - replace with actual API call
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: 'ai',
        content: "Based on the resume, the candidate has extensive experience in similar roles..."
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-foreground">AI Recruitment Assistant</h1>
          <ThemeToggle />
        </div>
        
        {/* Job Selection */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Select Job Description</h2>
          <Select value={selectedJob} onValueChange={setSelectedJob}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a position" />
            </SelectTrigger>
            <SelectContent>
              {jobDescriptions.map(job => (
                <SelectItem key={job.id} value={job.id}>
                  {job.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Resume Upload */}
        {selectedJob && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upload Resumes</h2>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="w-full" onClick={() => document.getElementById('resume-upload')?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                Select Files
              </Button>
              <input
                id="resume-upload"
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
            {resumes.length > 0 && (
              <ScrollArea className="h-40 mt-4">
                <div className="space-y-2">
                  {resumes.map((resume, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleResumeSelect(resume)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {resume.name}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            )}
          </Card>
        )}

        {/* Candidate Profile and Analysis Section */}
        {selectedResume && analysis && (
          <>
            {/* Candidate Profile */}
            <Card className="p-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={analysis.profile.avatarUrl} alt={analysis.profile.name} />
                  <AvatarFallback>{analysis.profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="space-y-3">
                  <div>
                    <h2 className="text-2xl font-bold">{analysis.profile.name}</h2>
                    <p className="text-lg text-muted-foreground">{analysis.profile.designation}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{analysis.profile.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{analysis.profile.experience} years experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Chat Interface */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">AI Chat Assistant</h2>
                <ScrollArea className="h-[400px] mb-4">
                  <div className="space-y-4">
                    {chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Ask about the candidate..."
                    className="flex-1"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <Button>
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </Card>

              {/* Analysis Results */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Candidate Analysis</h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Selection Score</h3>
                      <span className="text-primary">{analysis.selectionPercentage}%</span>
                    </div>
                    <Progress value={analysis.selectionPercentage} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Risk Assessment</h3>
                      <span className="text-destructive">{analysis.riskScore}%</span>
                    </div>
                    <Progress value={analysis.riskScore} className="h-2" />
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">AI Feedback</h3>
                    <p className="text-muted-foreground">{analysis.feedback}</p>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}