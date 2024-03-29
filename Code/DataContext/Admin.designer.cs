﻿#pragma warning disable 1591
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.239
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DataContext
{
	using System.Data.Linq;
	using System.Data.Linq.Mapping;
	using System.Data;
	using System.Collections.Generic;
	using System.Reflection;
	using System.Linq;
	using System.Linq.Expressions;
	using System.ComponentModel;
	using System;
	
	
	[global::System.Data.Linq.Mapping.DatabaseAttribute(Name="WEBSOFT")]
	public partial class AdminDataContext : System.Data.Linq.DataContext
	{
		
		private static System.Data.Linq.Mapping.MappingSource mappingSource = new AttributeMappingSource();
		
    #region Extensibility Method Definitions
    partial void OnCreated();
    #endregion
		
		public AdminDataContext() : 
				base(global::DataContext.Properties.Settings.Default.WEBSOFTConnectionString, mappingSource)
		{
			OnCreated();
		}
		
		public AdminDataContext(string connection) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public AdminDataContext(System.Data.IDbConnection connection) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public AdminDataContext(string connection, System.Data.Linq.Mapping.MappingSource mappingSource) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		public AdminDataContext(System.Data.IDbConnection connection, System.Data.Linq.Mapping.MappingSource mappingSource) : 
				base(connection, mappingSource)
		{
			OnCreated();
		}
		
		[global::System.Data.Linq.Mapping.FunctionAttribute(Name="dbo.uspAdminGetAll")]
		public ISingleResult<uspAdminGetAllResult> uspAdminGetAll()
		{
			IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())));
			return ((ISingleResult<uspAdminGetAllResult>)(result.ReturnValue));
		}
		
		[global::System.Data.Linq.Mapping.FunctionAttribute(Name="dbo.uspAdminInsert")]
		public int uspAdminInsert([global::System.Data.Linq.Mapping.ParameterAttribute(Name="FullName", DbType="NVarChar(50)")] string fullName, [global::System.Data.Linq.Mapping.ParameterAttribute(Name="YM", DbType="NVarChar(50)")] string yM, [global::System.Data.Linq.Mapping.ParameterAttribute(Name="Phone", DbType="NVarChar(15)")] string phone, [global::System.Data.Linq.Mapping.ParameterAttribute(Name="Email", DbType="NVarChar(50)")] string email, [global::System.Data.Linq.Mapping.ParameterAttribute(Name="CreateDate", DbType="DateTime")] System.Nullable<System.DateTime> createDate, [global::System.Data.Linq.Mapping.ParameterAttribute(Name="Description", DbType="NVarChar(50)")] string description, [global::System.Data.Linq.Mapping.ParameterAttribute(Name="Status", DbType="Int")] System.Nullable<int> status)
		{
			IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), fullName, yM, phone, email, createDate, description, status);
			return ((int)(result.ReturnValue));
		}
		
		[global::System.Data.Linq.Mapping.FunctionAttribute(Name="dbo.uspAdminGetInfoByAdminID")]
		public ISingleResult<uspAdminGetInfoByAdminIDResult> uspAdminGetInfoByAdminID([global::System.Data.Linq.Mapping.ParameterAttribute(Name="AdminID", DbType="Int")] System.Nullable<int> adminID)
		{
			IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), adminID);
			return ((ISingleResult<uspAdminGetInfoByAdminIDResult>)(result.ReturnValue));
		}
		
		[global::System.Data.Linq.Mapping.FunctionAttribute(Name="dbo.uspAdminDeleteByAdminID")]
		public int uspAdminDeleteByAdminID([global::System.Data.Linq.Mapping.ParameterAttribute(Name="AdminID", DbType="Int")] System.Nullable<int> adminID)
		{
			IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), adminID);
			return ((int)(result.ReturnValue));
		}
		
		[global::System.Data.Linq.Mapping.FunctionAttribute(Name="dbo.uspAdminUpdateByAdminID")]
		public int uspAdminUpdateByAdminID([global::System.Data.Linq.Mapping.ParameterAttribute(Name="AdminID", DbType="Int")] System.Nullable<int> adminID, [global::System.Data.Linq.Mapping.ParameterAttribute(Name="FullName", DbType="NVarChar(50)")] string fullName, [global::System.Data.Linq.Mapping.ParameterAttribute(Name="YM", DbType="NVarChar(50)")] string yM, [global::System.Data.Linq.Mapping.ParameterAttribute(Name="Phone", DbType="NVarChar(15)")] string phone, [global::System.Data.Linq.Mapping.ParameterAttribute(Name="Email", DbType="NVarChar(50)")] string email, [global::System.Data.Linq.Mapping.ParameterAttribute(Name="CreateDate", DbType="DateTime")] System.Nullable<System.DateTime> createDate, [global::System.Data.Linq.Mapping.ParameterAttribute(Name="Description", DbType="NVarChar(50)")] string description, [global::System.Data.Linq.Mapping.ParameterAttribute(Name="Status", DbType="Int")] System.Nullable<int> status)
		{
			IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), adminID, fullName, yM, phone, email, createDate, description, status);
			return ((int)(result.ReturnValue));
		}
		
		[global::System.Data.Linq.Mapping.FunctionAttribute(Name="dbo.uspAdminGetInfoByAdminName")]
		public ISingleResult<uspAdminGetInfoByAdminNameResult> uspAdminGetInfoByAdminName([global::System.Data.Linq.Mapping.ParameterAttribute(Name="UserName", DbType="NVarChar(50)")] string userName)
		{
			IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), userName);
			return ((ISingleResult<uspAdminGetInfoByAdminNameResult>)(result.ReturnValue));
		}
		
		[global::System.Data.Linq.Mapping.FunctionAttribute(Name="dbo.uspAdminCheckLogin")]
		public int uspAdminCheckLogin([global::System.Data.Linq.Mapping.ParameterAttribute(DbType="NVarChar(50)")] string userName, [global::System.Data.Linq.Mapping.ParameterAttribute(DbType="NVarChar(20)")] string password, [global::System.Data.Linq.Mapping.ParameterAttribute(Name="return", DbType="Int")] ref System.Nullable<int> @return)
		{
			IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), userName, password, @return);
			@return = ((System.Nullable<int>)(result.GetParameterValue(2)));
			return ((int)(result.ReturnValue));
		}
		
		[global::System.Data.Linq.Mapping.FunctionAttribute(Name="dbo.uspFunctionGetAllByTree")]
		public ISingleResult<uspFunctionGetAllByTreeResult> uspFunctionGetAllByTree([global::System.Data.Linq.Mapping.ParameterAttribute(Name="FunctionID", DbType="Int")] System.Nullable<int> functionID, [global::System.Data.Linq.Mapping.ParameterAttribute(Name="AdminID", DbType="Int")] System.Nullable<int> adminID)
		{
			IExecuteResult result = this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), functionID, adminID);
			return ((ISingleResult<uspFunctionGetAllByTreeResult>)(result.ReturnValue));
		}
	}
	
	public partial class uspAdminGetAllResult
	{
		
		private int _AdminID;
		
		private string _FullName;
		
		private string _YM;
		
		private string _Phone;
		
		private string _Email;
		
		private System.DateTime _CreateDate;
		
		private string _Description;
		
		private int _Status;
		
		public uspAdminGetAllResult()
		{
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_AdminID", DbType="Int NOT NULL")]
		public int AdminID
		{
			get
			{
				return this._AdminID;
			}
			set
			{
				if ((this._AdminID != value))
				{
					this._AdminID = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_FullName", DbType="NVarChar(50) NOT NULL", CanBeNull=false)]
		public string FullName
		{
			get
			{
				return this._FullName;
			}
			set
			{
				if ((this._FullName != value))
				{
					this._FullName = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_YM", DbType="NVarChar(50) NOT NULL", CanBeNull=false)]
		public string YM
		{
			get
			{
				return this._YM;
			}
			set
			{
				if ((this._YM != value))
				{
					this._YM = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_Phone", DbType="NVarChar(15) NOT NULL", CanBeNull=false)]
		public string Phone
		{
			get
			{
				return this._Phone;
			}
			set
			{
				if ((this._Phone != value))
				{
					this._Phone = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_Email", DbType="NVarChar(50) NOT NULL", CanBeNull=false)]
		public string Email
		{
			get
			{
				return this._Email;
			}
			set
			{
				if ((this._Email != value))
				{
					this._Email = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_CreateDate", DbType="DateTime NOT NULL")]
		public System.DateTime CreateDate
		{
			get
			{
				return this._CreateDate;
			}
			set
			{
				if ((this._CreateDate != value))
				{
					this._CreateDate = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_Description", DbType="NVarChar(50) NOT NULL", CanBeNull=false)]
		public string Description
		{
			get
			{
				return this._Description;
			}
			set
			{
				if ((this._Description != value))
				{
					this._Description = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_Status", DbType="Int NOT NULL")]
		public int Status
		{
			get
			{
				return this._Status;
			}
			set
			{
				if ((this._Status != value))
				{
					this._Status = value;
				}
			}
		}
	}
	
	public partial class uspAdminGetInfoByAdminIDResult
	{
		
		private int _AdminID;
		
		private string _FullName;
		
		private string _YM;
		
		private string _Phone;
		
		private string _Email;
		
		private System.DateTime _CreateDate;
		
		private string _Description;
		
		private int _Status;
		
		public uspAdminGetInfoByAdminIDResult()
		{
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_AdminID", DbType="Int NOT NULL")]
		public int AdminID
		{
			get
			{
				return this._AdminID;
			}
			set
			{
				if ((this._AdminID != value))
				{
					this._AdminID = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_FullName", DbType="NVarChar(50) NOT NULL", CanBeNull=false)]
		public string FullName
		{
			get
			{
				return this._FullName;
			}
			set
			{
				if ((this._FullName != value))
				{
					this._FullName = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_YM", DbType="NVarChar(50) NOT NULL", CanBeNull=false)]
		public string YM
		{
			get
			{
				return this._YM;
			}
			set
			{
				if ((this._YM != value))
				{
					this._YM = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_Phone", DbType="NVarChar(15) NOT NULL", CanBeNull=false)]
		public string Phone
		{
			get
			{
				return this._Phone;
			}
			set
			{
				if ((this._Phone != value))
				{
					this._Phone = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_Email", DbType="NVarChar(50) NOT NULL", CanBeNull=false)]
		public string Email
		{
			get
			{
				return this._Email;
			}
			set
			{
				if ((this._Email != value))
				{
					this._Email = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_CreateDate", DbType="DateTime NOT NULL")]
		public System.DateTime CreateDate
		{
			get
			{
				return this._CreateDate;
			}
			set
			{
				if ((this._CreateDate != value))
				{
					this._CreateDate = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_Description", DbType="NVarChar(50) NOT NULL", CanBeNull=false)]
		public string Description
		{
			get
			{
				return this._Description;
			}
			set
			{
				if ((this._Description != value))
				{
					this._Description = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_Status", DbType="Int NOT NULL")]
		public int Status
		{
			get
			{
				return this._Status;
			}
			set
			{
				if ((this._Status != value))
				{
					this._Status = value;
				}
			}
		}
	}
	
	public partial class uspAdminGetInfoByAdminNameResult
	{
		
		private int _AdminID;
		
		private string _UserName;
		
		private string _Password;
		
		private bool _IsAdmin;
		
		private string _FullName;
		
		private string _YM;
		
		private string _Phone;
		
		private string _Email;
		
		private System.DateTime _CreateDate;
		
		private string _Description;
		
		private int _Status;
		
		public uspAdminGetInfoByAdminNameResult()
		{
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_AdminID", DbType="Int NOT NULL")]
		public int AdminID
		{
			get
			{
				return this._AdminID;
			}
			set
			{
				if ((this._AdminID != value))
				{
					this._AdminID = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_UserName", DbType="NVarChar(50) NOT NULL", CanBeNull=false)]
		public string UserName
		{
			get
			{
				return this._UserName;
			}
			set
			{
				if ((this._UserName != value))
				{
					this._UserName = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_Password", DbType="NVarChar(20) NOT NULL", CanBeNull=false)]
		public string Password
		{
			get
			{
				return this._Password;
			}
			set
			{
				if ((this._Password != value))
				{
					this._Password = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_IsAdmin", DbType="Bit NOT NULL")]
		public bool IsAdmin
		{
			get
			{
				return this._IsAdmin;
			}
			set
			{
				if ((this._IsAdmin != value))
				{
					this._IsAdmin = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_FullName", DbType="NVarChar(50) NOT NULL", CanBeNull=false)]
		public string FullName
		{
			get
			{
				return this._FullName;
			}
			set
			{
				if ((this._FullName != value))
				{
					this._FullName = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_YM", DbType="NVarChar(50) NOT NULL", CanBeNull=false)]
		public string YM
		{
			get
			{
				return this._YM;
			}
			set
			{
				if ((this._YM != value))
				{
					this._YM = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_Phone", DbType="NVarChar(15) NOT NULL", CanBeNull=false)]
		public string Phone
		{
			get
			{
				return this._Phone;
			}
			set
			{
				if ((this._Phone != value))
				{
					this._Phone = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_Email", DbType="NVarChar(50) NOT NULL", CanBeNull=false)]
		public string Email
		{
			get
			{
				return this._Email;
			}
			set
			{
				if ((this._Email != value))
				{
					this._Email = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_CreateDate", DbType="DateTime NOT NULL")]
		public System.DateTime CreateDate
		{
			get
			{
				return this._CreateDate;
			}
			set
			{
				if ((this._CreateDate != value))
				{
					this._CreateDate = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_Description", DbType="NVarChar(50) NOT NULL", CanBeNull=false)]
		public string Description
		{
			get
			{
				return this._Description;
			}
			set
			{
				if ((this._Description != value))
				{
					this._Description = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_Status", DbType="Int NOT NULL")]
		public int Status
		{
			get
			{
				return this._Status;
			}
			set
			{
				if ((this._Status != value))
				{
					this._Status = value;
				}
			}
		}
	}
	
	public partial class uspFunctionGetAllByTreeResult
	{
		
		private int _FunctionID;
		
		private string _Name;
		
		private string _URL;
		
		private System.Nullable<int> _ParrentID;
		
		private int _Order;
		
		private int _Status;
		
		public uspFunctionGetAllByTreeResult()
		{
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_FunctionID", DbType="Int NOT NULL")]
		public int FunctionID
		{
			get
			{
				return this._FunctionID;
			}
			set
			{
				if ((this._FunctionID != value))
				{
					this._FunctionID = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_Name", DbType="NVarChar(50) NOT NULL", CanBeNull=false)]
		public string Name
		{
			get
			{
				return this._Name;
			}
			set
			{
				if ((this._Name != value))
				{
					this._Name = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_URL", DbType="NVarChar(50) NOT NULL", CanBeNull=false)]
		public string URL
		{
			get
			{
				return this._URL;
			}
			set
			{
				if ((this._URL != value))
				{
					this._URL = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_ParrentID", DbType="Int")]
		public System.Nullable<int> ParrentID
		{
			get
			{
				return this._ParrentID;
			}
			set
			{
				if ((this._ParrentID != value))
				{
					this._ParrentID = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Name="[Order]", Storage="_Order", DbType="Int NOT NULL")]
		public int Order
		{
			get
			{
				return this._Order;
			}
			set
			{
				if ((this._Order != value))
				{
					this._Order = value;
				}
			}
		}
		
		[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_Status", DbType="Int NOT NULL")]
		public int Status
		{
			get
			{
				return this._Status;
			}
			set
			{
				if ((this._Status != value))
				{
					this._Status = value;
				}
			}
		}
	}
}
#pragma warning restore 1591
