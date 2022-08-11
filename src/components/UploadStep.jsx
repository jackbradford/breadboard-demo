import React from 'react'

export const UploadStep = ({addData, data, step}) => {
  
  const onChange = e => {
    addData(e.target.value)
  }

  return (
    <main>
      <label>Insert Valid JSON</label>
      <textarea onChange={onChange} value={data[step] || ""} />
    </main>
  )
}

