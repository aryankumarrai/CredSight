import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface RiskGaugeProps {
  score: number;
  label?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: number;
}

export function RiskGauge({ score, label = "Risk Score", trend, trendValue }: RiskGaugeProps) {
  // Score out of 100
  const data = [
    { name: "Score", value: score },
    { name: "Remaining", value: 100 - score }
  ];

  // Determine color based on score (Lower is better usually, but let's say <40 is low, 40-70 is med, >70 is high)
  let color = "hsl(var(--success))";
  let status = "Low Risk";
  
  if (score > 40) {
    color = "hsl(var(--warning))";
    status = "Moderate Risk";
  }
  if (score > 70) {
    color = "hsl(var(--destructive))";
    status = "High Risk";
  }

  return (
    <div className="relative w-full h-[220px] flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%" className="absolute inset-0">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="70%"
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={100}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell key="cell-0" fill={color} style={{ filter: `drop-shadow(0 0 8px ${color}40)` }} />
            <Cell key="cell-1" fill="hsl(var(--muted))" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute top-[45%] flex flex-col items-center text-center">
        <span className="font-display text-5xl font-bold tracking-tighter" style={{ color }}>
          {score}
        </span>
        <span className="text-sm font-medium text-muted-foreground mt-1 uppercase tracking-widest">{label}</span>
        
        <div className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-xs font-semibold text-white">{status}</span>
        </div>
      </div>
      
      {trend && trendValue && (
        <div className="absolute bottom-2 text-xs font-medium px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
          AI adjusting score {trend === "up" ? "+" : "-"}{trendValue}% based on inputs
        </div>
      )}
    </div>
  );
}
