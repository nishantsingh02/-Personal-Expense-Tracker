import React, { useState, useEffect } from "react";
import { Plus, CheckCircle, Edit, Trash2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../contexts/AuthContext";
import { getMilestones, createMilestone, markAsCompleted, deleteMilestone, editMilestone } from "../config/milestoneApi";

type Milestone = {
  id: number;
  task: string;
  reward: string;
  completed: boolean;
};

export const MilestoneCards: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState("");
  const [reward, setReward] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch milestones on mount
  useEffect(() => {
    const fetchMilestones = async () => {
      if (!user) return;  // Wait for user to be available
      try {
        const data = await getMilestones(user.id.toString()) as Milestone[];
        setMilestones(data);
      } catch (error) {
        console.error("Failed to fetch milestones", error);
      }
    };
    fetchMilestones();
  }, [user]);

  const addMilestone = async () => {
    if (!task.trim() || !reward.trim() || !user) return;
    try {
      const newMilestone = await createMilestone(user.id.toString(), task, reward) as Milestone;
      setMilestones((prev: Milestone[]) => [...prev, newMilestone]);
      setTask("");
      setReward("");
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create milestone", error);
    }
  };

  const handleMarkCompleted = async (id: number) => {
    try {
      const updatedMilestone = await markAsCompleted(id) as Milestone;  // Explicitly cast to Milestone type
      setMilestones((prev) =>
        prev.map((m) => (m.id === id ? updatedMilestone : m))
      );
    } catch (error) {
      console.error("Failed to mark milestone as completed:", error);
    }
  };
  

  const handleDelete = async (id: number) => {
    try {
      await deleteMilestone(id);
      setMilestones((prev) => prev.filter((milestone) => milestone.id !== id));
    } catch (error) {
      console.error("Failed to delete milestone", error);
    }
  };

  const startEdit = (milestone: Milestone) => {
    setEditingId(milestone.id);
    setTask(milestone.task);
    setReward(milestone.reward);
    setShowForm(true);
  };

  const handleEdit = async () => {
    if (!task.trim() || !reward.trim() || editingId === null) return;
    
    try {
      const updatedMilestone = await editMilestone(editingId, task, reward) as Milestone;
      setMilestones((prev) =>
        prev.map((milestone) =>
          milestone.id === editingId ? { ...milestone, task: updatedMilestone.task, reward: updatedMilestone.reward } : milestone
        )
      );
      setTask("");
      setReward("");
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      console.error("Failed to edit milestone", error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setTask("");
    setReward("");
    setEditingId(null);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleMilestones = milestones.slice(0, visibleCount);
  const hasMoreToShow = milestones.length > visibleCount;

  // Generate color based on milestone index
  const getMilestoneColor = (index: number) => {
    const colors = [
      "from-green-500 to-teal-500",
      "from-blue-500 to-indigo-500",
      "from-purple-500 to-pink-500",
      "from-red-500 to-orange-500",
      "from-yellow-500 to-amber-500",
      "from-cyan-500 to-sky-500"
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-green-700 to-emerald-500 dark:from-white dark:to-green-300 bg-clip-text text-transparent">
          Your Milestones
        </h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs rounded-lg border-green-500 hover:bg-green-50 dark:hover:bg-green-900 transition-all duration-300"
          onClick={() => {
            setEditingId(null);
            setTask("");
            setReward("");
            setShowForm(true);
          }}
        >
          <Plus className="h-3.5 w-3.5 mr-1.5" />
          Add Milestone
        </Button>
      </div>

      {/* Add/Edit Milestone Form */}
      {showForm && (
        <div className="mb-6 p-4 rounded-xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-gray-800 shadow-md transition-all duration-300 ease-in-out">
          <h3 className="text-base font-semibold mb-3 text-green-800 dark:text-green-300">
            {editingId ? "Edit Milestone" : "Create New Milestone"}
          </h3>
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Task
              </label>
              <input
                type="text"
                placeholder="What do you want to achieve?"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ease-in-out duration-300 placeholder:text-gray-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reward
              </label>
              <input
                type="text"
                placeholder="What's your reward for completing this?"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ease-in-out duration-300 placeholder:text-gray-400 text-sm"
              />
            </div>
            <div className="flex gap-2 mt-2">
              <Button 
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium"
                onClick={editingId !== null ? handleEdit : addMilestone}
              >
                {editingId !== null ? "Update" : "Save"}
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-gray-300 dark:border-gray-600 text-xs font-medium"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Milestones Grid */}
      {milestones.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-center p-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
          <p className="text-lg">No milestones yet. Add one to track your progress!</p>
        </div>
      ) : (
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {visibleMilestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className={`rounded-xl h-auto p-5 flex flex-col justify-between ${
                  milestone.completed
                    ? "bg-gradient-to-br from-gray-400 to-gray-600"
                    : `bg-gradient-to-br ${getMilestoneColor(index)}`
                } text-white shadow-lg transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[url('/milestone-bg.svg')] opacity-10"></div>
                
                {/* Content Section */}
                <div className="relative mb-4">
                  <h3 className={`text-xl font-semibold mb-3 ${milestone.completed ? "line-through opacity-70" : ""}`}>
                    {milestone.task}
                  </h3>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white/80">Your reward:</p>
                    <p className={`text-xl font-bold ${milestone.completed ? "line-through opacity-70" : ""}`}>
                      {milestone.reward}
                    </p>
                  </div>
                </div>
                
                {/* Footer Section */}
                <div className="relative mt-auto border-t border-white/20 pt-3">
                  <p className="text-xl font-medium text-white/80 mb-2.5">
                    {isAuthenticated ? `${user?.name}'s Achievement` : "Your Achievement"}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {/* Complete button with text changed from "Complete" to "Completed" */}
                    {!milestone.completed && (
                      <Button
                        size="sm"
                        className="text-xs bg-white/20 hover:bg-white/30 text-white font-medium"
                        onClick={() => handleMarkCompleted(milestone.id)}
                      >
                        <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                        Mark As Completed
                      </Button>
                    )}
                    {milestone.completed && (
                      <div className="flex items-center text-white text-xs font-bold py-1">
                        <CheckCircle className="h-3.5 w-3.5 mr-1.5" /> Completed
                      </div>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs text-white bg-white/20 border-white/30 hover:bg-white/10 font-medium"
                      onClick={() => startEdit(milestone)}
                    >
                      <Edit className="h-3.5 w-3.5 mr-1.5" /> Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs text-white bg-white/20 border-white/30 hover:bg-white/10 font-medium"
                      onClick={() => handleDelete(milestone.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {hasMoreToShow && (
            <div className="mt-8 text-center">
              <Button 
                variant="outline" 
                className="rounded-full px-7 py-3 border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 transition-all duration-300 font-medium text-base"
                onClick={loadMore}
              >
                View More <ChevronRight className="h-5 w-5 ml-1.5" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};