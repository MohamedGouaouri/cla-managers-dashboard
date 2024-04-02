'use client'

import { changeLanguageAction } from "@/app/redux/slices/ui.slice"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector } from "react-redux"


export function LanguageMenu() {
  const language = useSelector((state: any) => state.ui.language)
  const dispatch = useDispatch()
 
  const handleLanguageChange = (language: string) => {
    dispatch(changeLanguageAction({
        language
    }))
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Language: {language}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Choose a language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={language} onValueChange={(value) => handleLanguageChange(value)}>
          <DropdownMenuRadioItem value="js">Javascript</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="py">Python</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageMenu