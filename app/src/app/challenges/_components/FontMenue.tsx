'use client'

import { changeFontSizeAction } from "@/app/redux/slices/ui.slice"
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


export function FontSizeMenu() {
  const fontSize = useSelector((state: any) => state.ui.fontSize)
  const dispatch = useDispatch()
 
  const handleFontChange = (fontSize: string) => {
    dispatch(changeFontSizeAction({
        fontSize: parseInt(fontSize)
    }))
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Font size: {fontSize}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Choose a font size</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={fontSize} onValueChange={(value) => handleFontChange(value)}>
          <DropdownMenuRadioItem value="16">16</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="18">18</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="24">24</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="28">28</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default FontSizeMenu