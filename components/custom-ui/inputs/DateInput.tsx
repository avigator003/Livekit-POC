// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { useEffect, useState } from "react";

// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";
// import { Button } from "../../ui/button";

// interface DateInputProps {
//   label:string;
//   value: Date | null;
//   onChange: (date: Date | null | undefined) => void;
// }

// const DateInput: React.FC<DateInputProps> = ({ value, onChange,label }) => {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) return null;

//   return (
//     <Popover>
//       <PopoverTrigger className="rounded-md ring-offset-slate-50">
//         <h6 className="text-left text-sm mb-2">{label}</h6>
//         <Button
//           tabIndex={-1}
//           variant={"outline"}
//           className={cn(
//             "h-full w-full justify-start border-textGrey bg-transparent px-4 py-3 text-left text-base font-normal text-grey hover:bg-[#9eb3e8] hover:text-white dark:border-borderColor dark:text-white dark:hover:bg-[#1c1c22] dark:hover:text-foreground",
//             !value && "text-textGrey",
//           )}
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {value ? format(value, "PPP") : <span className="">Pick a date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent
//         align="start"
//         className="w-auto border-borderColor bg-[#09090B] p-0 text-foreground"
//       >
//         <Calendar
//           mode="single"
//           captionLayout="dropdown-buttons"
//           selected={value ? value : undefined}
//           // onSelect={(nextDate) => {
//           //   nextDate && setDate(nextDate);
//           // }}
//           onSelect={onChange}
//           fromYear={1960}
//           toYear={2030}
//         />
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default DateInput;
