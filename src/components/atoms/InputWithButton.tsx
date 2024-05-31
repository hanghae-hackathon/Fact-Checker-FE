import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { TEXT } from "@/constants";
import "./index.css";

export function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder={TEXT.INPUT_PLACEHOLDER}
        className="fact-input"
      />
      <Button type="submit" className="fact-button">
        검사
      </Button>
    </div>
  );
}
