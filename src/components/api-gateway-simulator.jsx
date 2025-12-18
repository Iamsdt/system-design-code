import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Server, Activity, Lock, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

const ApiGatewaySimulator = () => {
  // State
  const [logs, setLogs] = useState([]);
  const [apiKey, setApiKey] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState("/users");
  const [tokens, setTokens] = useState(10);
  const [isSpamming, setIsSpamming] = useState(false);
  
  // Constants
  const MAX_TOKENS = 10;
  const REFILL_RATE_MS = 1000;
  const VALID_API_KEY = "secret-123";
  
  const endpoints = [
    { path: "/users", service: "User Service", protected: false },
    { path: "/orders", service: "Order Service", protected: true },
    { path: "/payments", service: "Payment Service", protected: true },
  ];

  // Ref for spam interval
  const spamIntervalRef = useRef(null);

  // Token Bucket Refill Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTokens(prev => Math.min(prev + 1, MAX_TOKENS));
    }, REFILL_RATE_MS);
    return () => clearInterval(interval);
  }, []);

  // Spam Logic
  useEffect(() => {
    if (isSpamming) {
      spamIntervalRef.current = setInterval(() => {
        handleRequest();
      }, 200); // 5 requests per second
    } else {
      clearInterval(spamIntervalRef.current);
    }
    return () => clearInterval(spamIntervalRef.current);
  }, [isSpamming, tokens, apiKey, selectedEndpoint]); // Dependencies needed for handleRequest closure if not using functional updates carefully, but handleRequest changes too.

  // We need a stable handleRequest for the interval, or use a ref for current state
  // To keep it simple, let's just use a separate effect for spamming that calls a ref-based handler or just re-creates the interval.
  // Actually, simpler: just put handleRequest in the dependency array if it's memoized, or use functional state updates.
  
  const addLog = (status, message, source) => {
    setLogs(prev => [{
      id: Date.now() + Math.random(),
      timestamp: new Date().toLocaleTimeString(),
      status,
      message,
      source
    }, ...prev].slice(0, 10));
  };

  const handleRequest = () => {
    const endpointConfig = endpoints.find(e => e.path === selectedEndpoint);
    
    // 1. Rate Limiting Check
    if (tokens < 1) {
      addLog(429, "Too Many Requests", "Gateway (Rate Limiter)");
      return;
    }

    // Consume Token
    setTokens(prev => prev - 1);

    // 2. Auth Check
    if (endpointConfig.protected && apiKey !== VALID_API_KEY) {
      addLog(401, "Unauthorized - Invalid API Key", "Gateway (Auth Guard)");
      return;
    }

    // 3. Routing & Success
    addLog(200, `Forwarded to ${endpointConfig.service}`, endpointConfig.service);
  };

  const getStatusColor = (status) => {
    if (status === 200) return "text-green-600 bg-green-50 border-green-200";
    if (status === 429) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 bg-white">
      {/* Client Panel */}
      <Card className="col-span-1 bg-white border-2 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Activity className="w-5 h-5" /> Client Request
          </CardTitle>
          <CardDescription className="text-slate-600">Simulate incoming traffic</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-700">Endpoint</Label>
            <div className="grid grid-cols-1 gap-2">
              {endpoints.map((ep) => (
                <Button
                  key={ep.path}
                  variant={selectedEndpoint === ep.path ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setSelectedEndpoint(ep.path)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{ep.path}</span>
                    {ep.protected && <Lock className="w-3 h-3 ml-2 opacity-50" />}
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700">API Key (Required for locked endpoints)</Label>
            <Input 
              placeholder="Enter 'secret-123'" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-white"
            />
            <p className="text-xs text-slate-500">Try: secret-123</p>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button className="flex-1" onClick={handleRequest}>Send Request</Button>
          <Button 
            variant={isSpamming ? "destructive" : "secondary"}
            onClick={() => setIsSpamming(!isSpamming)}
          >
            {isSpamming ? "Stop Spam" : "Spam (5/s)"}
          </Button>
        </CardFooter>
      </Card>

      {/* Gateway Visualization Panel */}
      <Card className="col-span-1 bg-white border-2 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Shield className="w-5 h-5" /> API Gateway
          </CardTitle>
          <CardDescription className="text-slate-600">Processing Logic</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Rate Limiter Visual */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-sm flex items-center gap-2 text-slate-900">
                <Activity className="w-4 h-4 text-blue-500" /> Rate Limiter
              </span>
              <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-slate-200 text-slate-700">
                {tokens}/{MAX_TOKENS} tokens
              </span>
            </div>
            <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${tokens < 3 ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${(tokens / MAX_TOKENS) * 100}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Cost: 1 token/req. Refill: 1 token/s.
            </p>
          </div>

          {/* Auth Visual */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm">
             <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-sm flex items-center gap-2 text-slate-900">
                <Lock className="w-4 h-4 text-purple-500" /> Auth Guard
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              Status: 
              {endpoints.find(e => e.path === selectedEndpoint)?.protected ? (
                apiKey === VALID_API_KEY ? 
                  <span className="text-green-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Pass</span> : 
                  <span className="text-red-600 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Fail</span>
              ) : (
                <span className="text-slate-500">Public (Skipped)</span>
              )}
            </div>
          </div>

          {/* Router Visual */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm">
             <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-sm flex items-center gap-2 text-slate-900">
                <ArrowRight className="w-4 h-4 text-orange-500" /> Router
              </span>
            </div>
            <div className="text-sm text-center p-2 bg-white rounded border border-slate-200 text-slate-700">
              {selectedEndpoint} ➔ {endpoints.find(e => e.path === selectedEndpoint)?.service}
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Logs Panel */}
      <Card className="col-span-1 bg-white border-2 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Server className="w-5 h-5" /> System Logs
          </CardTitle>
          <CardDescription className="text-slate-600">Recent activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {logs.length === 0 && (
              <div className="text-center text-slate-500 py-8 text-sm">
                No requests yet.
              </div>
            )}
            {logs.map((log) => (
              <div 
                key={log.id} 
                className={`p-2 rounded border text-xs flex items-start gap-2 ${getStatusColor(log.status)}`}
              >
                <span className="font-mono opacity-70 text-slate-600">{log.timestamp}</span>
                <div className="flex-1">
                  <div className="font-semibold flex justify-between">
                    <span>{log.status}</span>
                    <span>{log.source}</span>
                  </div>
                  <div>{log.message}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiGatewaySimulator;
