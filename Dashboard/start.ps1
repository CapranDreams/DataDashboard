Start-Job -Name "API_temp" -ScriptBlock {npm --prefix C:/Users/schra/Documents/St_Thomas/SEIS622_App/Dashboard/DataDashboard/API_temperature run dev }
Start-Job -Name "API_acoustic" -ScriptBlock {npm --prefix C:/Users/schra/Documents/St_Thomas/SEIS622_App/Dashboard/DataDashboard/API_acoustic run dev }
Start-Job -Name "API_accel" -ScriptBlock {npm --prefix C:/Users/schra/Documents/St_Thomas/SEIS622_App/Dashboard/DataDashboard/API_accel run dev }
Start-Job -Name "API_db" -ScriptBlock {npm --prefix C:/Users/schra/Documents/St_Thomas/SEIS622_App/Dashboard/DataDashboard/API_db run dev }
Start-Job -Name "Dashboard" -ScriptBlock {npm --prefix C:/Users/schra/Documents/St_Thomas/SEIS622_App/Dashboard/DataDashboard/Dashboard run start }