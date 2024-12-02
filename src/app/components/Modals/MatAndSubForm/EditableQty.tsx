// This should be in your client-side component
'use client';

import React, { useState } from 'react';
import { revalidatePath } from 'next/cache';
import { updateQty } from '@/actionsSupabase/Update';

const EditableQtyCell = ({ mat, projID, taskId }) => {
  const [newQty, setNewQty] = useState(mat.qty);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission behavior
      if (newQty !== mat.qty) {
        console.log(`Updating material ${mat} with qty: ${mat.qty}`);
        updateQty(mat.id, newQty, taskId, projID);
      }
    }
  };

  return (
    <form action={async (e) => {}}>
      <input
        name="qty"
        type="number"
        value={newQty}
        className="text-center h-8 w-16 bg-transparent border border-gray-300 rounded"
        onChange={(e) => setNewQty(Number(e.target.value))}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};

export default EditableQtyCell;
