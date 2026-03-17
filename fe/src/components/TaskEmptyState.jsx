    import { Card } from "@/components/ui/card";
    import { Circle } from "lucide-react";
    import React from "react";

    const TaskEmptyState = ({ filter }) => {
    return (
        <Card className="p-8 text-center border-0 shadow-custom-md bg-gradient-card">
        <div className="space-y-3">
            <Circle className="mx-auto size-12 text-muted-foreground" />
            <div>
            <h3 className="font-medium text-foreground">
                {filter === "active"
                ? "No active tasks yet"
                : filter === "completed"
                ? "No completed tasks yet"
                : "No tasks yet"}
            </h3>
            <p className="text-sm text-muted-foreground">
                {
                    filter === "all" ? "Create your first task to get started!" :`convert to "all" to see tasks ${filter === "active" ? "in progress" : "completed"}.`
                }
            </p>
            </div>
        </div>
        </Card>
    );
    };

    export default TaskEmptyState;
