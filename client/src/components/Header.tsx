import { Button } from "@/components/ui/button";
import { Download, Settings, FileText, Bot } from "lucide-react";

interface HeaderProps {
  onDownloadPDF: () => void;
  onAIAssistant: () => void;
  isPdfLoading: boolean;
  isLlmLoading: boolean;
}

export default function Header({ onDownloadPDF, onAIAssistant, isPdfLoading, isLlmLoading }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-primary font-bold text-xl">Resumaker</div>
        <div className="hidden md:block ml-10">
          <Button variant="outline" size="sm" className="mr-2">
            <FileText className="h-4 w-4 mr-2" />
            Templates
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="bg-primary/10 text-primary font-medium hover:bg-primary/20 mr-4"
          onClick={onAIAssistant}
          disabled={isLlmLoading}
        >
          <Bot className="h-4 w-4 mr-2" />
          {isLlmLoading ? "Processing..." : "AI Assistant"}
        </Button>
        <Button 
          variant="default" 
          className="bg-accent hover:bg-accent/90 text-white font-medium"
          onClick={onDownloadPDF}
          disabled={isPdfLoading}
        >
          <Download className="h-4 w-4 mr-2" />
          {isPdfLoading ? "Generating..." : "Download PDF"}
        </Button>
      </div>
    </header>
  );
}
