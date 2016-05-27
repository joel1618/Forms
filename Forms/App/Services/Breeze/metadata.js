window.breeze = window.breeze || {}; window.breeze.metadata = JSON.stringify(
{"schema":{"namespace":"Forms","alias":"Self","annotation:UseStrongSpatialTypes":"false","xmlns:annotation":"http://schemas.microsoft.com/ado/2009/02/edm/annotation","xmlns:customannotation":"http://schemas.microsoft.com/ado/2013/11/edm/customannotation","xmlns":"http://schemas.microsoft.com/ado/2009/11/edm","cSpaceOSpaceMapping":"[[\"Forms.Form\",\"Forms.Form\"],[\"Forms.AspNetUser\",\"Forms.AspNetUser\"],[\"Forms.AspNetRole\",\"Forms.AspNetRole\"],[\"Forms.AspNetUserClaim\",\"Forms.AspNetUserClaim\"],[\"Forms.AspNetUserLogin\",\"Forms.AspNetUserLogin\"],[\"Forms.AspNetUsersInfo\",\"Forms.AspNetUsersInfo\"],[\"Forms.FormDetail\",\"Forms.FormDetail\"],[\"Forms.FormDetailsOption\",\"Forms.FormDetailsOption\"],[\"Forms.FormDetailsOptionDetail\",\"Forms.FormDetailsOptionDetail\"],[\"Forms.FormDetailsType\",\"Forms.FormDetailsType\"],[\"Forms.ValueDetail\",\"Forms.ValueDetail\"],[\"Forms.Value\",\"Forms.Value\"]]","entityType":[{"name":"Form","customannotation:ClrType":"Forms.Form, Forms, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Description","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"PublishUrl","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"UserId","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"CreatedDateTime","type":"Edm.DateTime","nullable":"false"},{"name":"ModifiedDateTime","type":"Edm.DateTime"}],"navigationProperty":[{"name":"AspNetUser","relationship":"Self.AspNetUser_Forms","fromRole":"AspNetUser_Forms_Target","toRole":"AspNetUser_Forms_Source"},{"name":"FormDetails","relationship":"Self.FormDetail_Form","fromRole":"FormDetail_Form_Target","toRole":"FormDetail_Form_Source"},{"name":"Values","relationship":"Self.Value_Form","fromRole":"Value_Form_Target","toRole":"Value_Form_Source"}]},{"name":"AspNetUser","customannotation:ClrType":"Forms.AspNetUser, Forms, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"Email","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"EmailConfirmed","type":"Edm.Boolean","nullable":"false"},{"name":"PasswordHash","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"SecurityStamp","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"PhoneNumber","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"PhoneNumberConfirmed","type":"Edm.Boolean","nullable":"false"},{"name":"TwoFactorEnabled","type":"Edm.Boolean","nullable":"false"},{"name":"LockoutEndDateUtc","type":"Edm.DateTime"},{"name":"LockoutEnabled","type":"Edm.Boolean","nullable":"false"},{"name":"AccessFailedCount","type":"Edm.Int32","nullable":"false"},{"name":"UserName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"AspNetRoles","relationship":"Self.AspNetRole_AspNetUsers","fromRole":"AspNetRole_AspNetUsers_Target","toRole":"AspNetRole_AspNetUsers_Source"},{"name":"AspNetUserClaims","relationship":"Self.AspNetUserClaim_AspNetUser","fromRole":"AspNetUserClaim_AspNetUser_Target","toRole":"AspNetUserClaim_AspNetUser_Source"},{"name":"AspNetUserLogins","relationship":"Self.AspNetUserLogin_AspNetUser","fromRole":"AspNetUserLogin_AspNetUser_Target","toRole":"AspNetUserLogin_AspNetUser_Source"},{"name":"AspNetUsersInfoes","relationship":"Self.AspNetUsersInfo_AspNetUser","fromRole":"AspNetUsersInfo_AspNetUser_Target","toRole":"AspNetUsersInfo_AspNetUser_Source"},{"name":"FormDetails","relationship":"Self.FormDetail_AspNetUser","fromRole":"FormDetail_AspNetUser_Target","toRole":"FormDetail_AspNetUser_Source"},{"name":"Forms","relationship":"Self.AspNetUser_Forms","fromRole":"AspNetUser_Forms_Source","toRole":"AspNetUser_Forms_Target"},{"name":"ValueDetails","relationship":"Self.ValueDetail_AspNetUser","fromRole":"ValueDetail_AspNetUser_Target","toRole":"ValueDetail_AspNetUser_Source"},{"name":"Values","relationship":"Self.Value_AspNetUser","fromRole":"Value_AspNetUser_Target","toRole":"Value_AspNetUser_Source"}]},{"name":"AspNetRole","customannotation:ClrType":"Forms.AspNetRole, Forms, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"AspNetUsers","relationship":"Self.AspNetRole_AspNetUsers","fromRole":"AspNetRole_AspNetUsers_Source","toRole":"AspNetRole_AspNetUsers_Target"}},{"name":"AspNetUserClaim","customannotation:ClrType":"Forms.AspNetUserClaim, Forms, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Int32","nullable":"false","annotation:StoreGeneratedPattern":"Identity"},{"name":"UserId","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ClaimType","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ClaimValue","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"AspNetUser","relationship":"Self.AspNetUserClaim_AspNetUser","fromRole":"AspNetUserClaim_AspNetUser_Source","toRole":"AspNetUserClaim_AspNetUser_Target"}},{"name":"AspNetUserLogin","customannotation:ClrType":"Forms.AspNetUserLogin, Forms, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"UserId"}},"property":[{"name":"UserId","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"LoginProvider","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"ProviderKey","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"AspNetUser","relationship":"Self.AspNetUserLogin_AspNetUser","fromRole":"AspNetUserLogin_AspNetUser_Source","toRole":"AspNetUserLogin_AspNetUser_Target"}},{"name":"AspNetUsersInfo","customannotation:ClrType":"Forms.AspNetUsersInfo, Forms, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.String","maxLength":"128","fixedLength":"false","unicode":"true","nullable":"false"},{"name":"AspNetUsersId","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"FirstName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"LastName","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"AspNetUser","relationship":"Self.AspNetUsersInfo_AspNetUser","fromRole":"AspNetUsersInfo_AspNetUser_Source","toRole":"AspNetUsersInfo_AspNetUser_Target"}},{"name":"FormDetail","customannotation:ClrType":"Forms.FormDetail, Forms, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"FormId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Description","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"Title","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"FormDetailsTypeId","type":"Edm.Guid","nullable":"false"},{"name":"FormDetailsOptionId","type":"Edm.Guid"},{"name":"UserId","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"CreatedDateTime","type":"Edm.DateTime","nullable":"false"},{"name":"ModifiedDateTime","type":"Edm.DateTime","nullable":"false"},{"name":"IsRequired","type":"Edm.Boolean","nullable":"false"}],"navigationProperty":[{"name":"AspNetUser","relationship":"Self.FormDetail_AspNetUser","fromRole":"FormDetail_AspNetUser_Source","toRole":"FormDetail_AspNetUser_Target"},{"name":"Form","relationship":"Self.FormDetail_Form","fromRole":"FormDetail_Form_Source","toRole":"FormDetail_Form_Target"},{"name":"FormDetailsOption","relationship":"Self.FormDetailsOption_FormDetails","fromRole":"FormDetailsOption_FormDetails_Target","toRole":"FormDetailsOption_FormDetails_Source"},{"name":"FormDetailsType","relationship":"Self.FormDetailsType_FormDetails","fromRole":"FormDetailsType_FormDetails_Target","toRole":"FormDetailsType_FormDetails_Source"},{"name":"ValueDetails","relationship":"Self.ValueDetail_FormDetail","fromRole":"ValueDetail_FormDetail_Target","toRole":"ValueDetail_FormDetail_Source"}]},{"name":"FormDetailsOption","customannotation:ClrType":"Forms.FormDetailsOption, Forms, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":[{"name":"FormDetails","relationship":"Self.FormDetailsOption_FormDetails","fromRole":"FormDetailsOption_FormDetails_Source","toRole":"FormDetailsOption_FormDetails_Target"},{"name":"FormDetailsOptionDetails","relationship":"Self.FormDetailsOptionDetail_FormDetailsOption","fromRole":"FormDetailsOptionDetail_FormDetailsOption_Target","toRole":"FormDetailsOptionDetail_FormDetailsOption_Source"}]},{"name":"FormDetailsOptionDetail","customannotation:ClrType":"Forms.FormDetailsOptionDetail, Forms, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"FormDetailsOptionId","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"FormDetailsOption","relationship":"Self.FormDetailsOptionDetail_FormDetailsOption","fromRole":"FormDetailsOptionDetail_FormDetailsOption_Source","toRole":"FormDetailsOptionDetail_FormDetailsOption_Target"}},{"name":"FormDetailsType","customannotation:ClrType":"Forms.FormDetailsType, Forms, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"Name","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"}],"navigationProperty":{"name":"FormDetails","relationship":"Self.FormDetailsType_FormDetails","fromRole":"FormDetailsType_FormDetails_Source","toRole":"FormDetailsType_FormDetails_Target"}},{"name":"ValueDetail","customannotation:ClrType":"Forms.ValueDetail, Forms, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"ValueId","type":"Edm.Guid","nullable":"false"},{"name":"FormDetailsId","type":"Edm.Guid","nullable":"false"},{"name":"Value","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"UserId","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"CreatedDateTime","type":"Edm.DateTime","nullable":"false"},{"name":"ModifiedDateTime","type":"Edm.DateTime"}],"navigationProperty":[{"name":"AspNetUser","relationship":"Self.ValueDetail_AspNetUser","fromRole":"ValueDetail_AspNetUser_Source","toRole":"ValueDetail_AspNetUser_Target"},{"name":"FormDetail","relationship":"Self.ValueDetail_FormDetail","fromRole":"ValueDetail_FormDetail_Source","toRole":"ValueDetail_FormDetail_Target"}]},{"name":"Value","customannotation:ClrType":"Forms.Value, Forms, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","key":{"propertyRef":{"name":"Id"}},"property":[{"name":"Id","type":"Edm.Guid","nullable":"false"},{"name":"FormId","type":"Edm.Guid","nullable":"false"},{"name":"UserId","type":"Edm.String","maxLength":"Max","fixedLength":"false","unicode":"true"},{"name":"CreatedDateTime","type":"Edm.DateTime","nullable":"false"},{"name":"ModifiedDateTime","type":"Edm.DateTime"}],"navigationProperty":[{"name":"AspNetUser","relationship":"Self.Value_AspNetUser","fromRole":"Value_AspNetUser_Source","toRole":"Value_AspNetUser_Target"},{"name":"Form","relationship":"Self.Value_Form","fromRole":"Value_Form_Source","toRole":"Value_Form_Target"}]}],"association":[{"name":"AspNetRole_AspNetUsers","end":[{"role":"AspNetRole_AspNetUsers_Source","type":"Edm.Self.AspNetRole","multiplicity":"*"},{"role":"AspNetRole_AspNetUsers_Target","type":"Edm.Self.AspNetUser","multiplicity":"*"}]},{"name":"AspNetUserClaim_AspNetUser","end":[{"role":"AspNetUserClaim_AspNetUser_Source","type":"Edm.Self.AspNetUserClaim","multiplicity":"*"},{"role":"AspNetUserClaim_AspNetUser_Target","type":"Edm.Self.AspNetUser","multiplicity":"0..1"}]},{"name":"AspNetUserLogin_AspNetUser","end":[{"role":"AspNetUserLogin_AspNetUser_Source","type":"Edm.Self.AspNetUserLogin","multiplicity":"*"},{"role":"AspNetUserLogin_AspNetUser_Target","type":"Edm.Self.AspNetUser","multiplicity":"0..1"}]},{"name":"AspNetUsersInfo_AspNetUser","end":[{"role":"AspNetUsersInfo_AspNetUser_Source","type":"Edm.Self.AspNetUsersInfo","multiplicity":"*"},{"role":"AspNetUsersInfo_AspNetUser_Target","type":"Edm.Self.AspNetUser","multiplicity":"0..1"}]},{"name":"FormDetail_AspNetUser","end":[{"role":"FormDetail_AspNetUser_Source","type":"Edm.Self.FormDetail","multiplicity":"*"},{"role":"FormDetail_AspNetUser_Target","type":"Edm.Self.AspNetUser","multiplicity":"0..1"}]},{"name":"FormDetail_Form","end":[{"role":"FormDetail_Form_Source","type":"Edm.Self.FormDetail","multiplicity":"*"},{"role":"FormDetail_Form_Target","type":"Edm.Self.Form","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"FormDetail_Form_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"FormDetail_Form_Source","propertyRef":{"name":"FormId"}}}},{"name":"FormDetailsOption_FormDetails","end":[{"role":"FormDetailsOption_FormDetails_Source","type":"Edm.Self.FormDetailsOption","multiplicity":"0..1"},{"role":"FormDetailsOption_FormDetails_Target","type":"Edm.Self.FormDetail","multiplicity":"*"}],"referentialConstraint":{"principal":{"role":"FormDetailsOption_FormDetails_Source","propertyRef":{"name":"Id"}},"dependent":{"role":"FormDetailsOption_FormDetails_Target","propertyRef":{"name":"FormDetailsOptionId"}}}},{"name":"FormDetailsOptionDetail_FormDetailsOption","end":[{"role":"FormDetailsOptionDetail_FormDetailsOption_Source","type":"Edm.Self.FormDetailsOptionDetail","multiplicity":"*"},{"role":"FormDetailsOptionDetail_FormDetailsOption_Target","type":"Edm.Self.FormDetailsOption","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"FormDetailsOptionDetail_FormDetailsOption_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"FormDetailsOptionDetail_FormDetailsOption_Source","propertyRef":{"name":"FormDetailsOptionId"}}}},{"name":"FormDetailsType_FormDetails","end":[{"role":"FormDetailsType_FormDetails_Source","type":"Edm.Self.FormDetailsType","multiplicity":"1","onDelete":{"action":"Cascade"}},{"role":"FormDetailsType_FormDetails_Target","type":"Edm.Self.FormDetail","multiplicity":"*"}],"referentialConstraint":{"principal":{"role":"FormDetailsType_FormDetails_Source","propertyRef":{"name":"Id"}},"dependent":{"role":"FormDetailsType_FormDetails_Target","propertyRef":{"name":"FormDetailsTypeId"}}}},{"name":"ValueDetail_AspNetUser","end":[{"role":"ValueDetail_AspNetUser_Source","type":"Edm.Self.ValueDetail","multiplicity":"*"},{"role":"ValueDetail_AspNetUser_Target","type":"Edm.Self.AspNetUser","multiplicity":"0..1"}]},{"name":"ValueDetail_FormDetail","end":[{"role":"ValueDetail_FormDetail_Source","type":"Edm.Self.ValueDetail","multiplicity":"*"},{"role":"ValueDetail_FormDetail_Target","type":"Edm.Self.FormDetail","multiplicity":"0..1"}]},{"name":"AspNetUser_Forms","end":[{"role":"AspNetUser_Forms_Source","type":"Edm.Self.AspNetUser","multiplicity":"0..1"},{"role":"AspNetUser_Forms_Target","type":"Edm.Self.Form","multiplicity":"*"}]},{"name":"Value_AspNetUser","end":[{"role":"Value_AspNetUser_Source","type":"Edm.Self.Value","multiplicity":"*"},{"role":"Value_AspNetUser_Target","type":"Edm.Self.AspNetUser","multiplicity":"0..1"}]},{"name":"Value_Form","end":[{"role":"Value_Form_Source","type":"Edm.Self.Value","multiplicity":"*"},{"role":"Value_Form_Target","type":"Edm.Self.Form","multiplicity":"1","onDelete":{"action":"Cascade"}}],"referentialConstraint":{"principal":{"role":"Value_Form_Target","propertyRef":{"name":"Id"}},"dependent":{"role":"Value_Form_Source","propertyRef":{"name":"FormId"}}}}],"entityContainer":{"name":"DatabaseContext","customannotation:UseClrTypes":"true","entitySet":[{"name":"Form","entityType":"Self.Form"},{"name":"AspNetUsers","entityType":"Self.AspNetUser"},{"name":"AspNetRoles","entityType":"Self.AspNetRole"},{"name":"AspNetUserClaims","entityType":"Self.AspNetUserClaim"},{"name":"AspNetUserLogins","entityType":"Self.AspNetUserLogin"},{"name":"AspNetUsersInfoes","entityType":"Self.AspNetUsersInfo"},{"name":"FormDetails","entityType":"Self.FormDetail"},{"name":"FormDetailsOptions","entityType":"Self.FormDetailsOption"},{"name":"FormDetailsOptionDetails","entityType":"Self.FormDetailsOptionDetail"},{"name":"FormDetailsTypes","entityType":"Self.FormDetailsType"},{"name":"ValueDetails","entityType":"Self.ValueDetail"},{"name":"Values","entityType":"Self.Value"}],"associationSet":[{"name":"AspNetRole_AspNetUsers","association":"Self.AspNetRole_AspNetUsers","end":[{"role":"AspNetRole_AspNetUsers_Source","entitySet":"AspNetRoles"},{"role":"AspNetRole_AspNetUsers_Target","entitySet":"AspNetUsers"}]},{"name":"AspNetUserClaim_AspNetUser","association":"Self.AspNetUserClaim_AspNetUser","end":[{"role":"AspNetUserClaim_AspNetUser_Source","entitySet":"AspNetUserClaims"},{"role":"AspNetUserClaim_AspNetUser_Target","entitySet":"AspNetUsers"}]},{"name":"AspNetUserLogin_AspNetUser","association":"Self.AspNetUserLogin_AspNetUser","end":[{"role":"AspNetUserLogin_AspNetUser_Source","entitySet":"AspNetUserLogins"},{"role":"AspNetUserLogin_AspNetUser_Target","entitySet":"AspNetUsers"}]},{"name":"AspNetUsersInfo_AspNetUser","association":"Self.AspNetUsersInfo_AspNetUser","end":[{"role":"AspNetUsersInfo_AspNetUser_Source","entitySet":"AspNetUsersInfoes"},{"role":"AspNetUsersInfo_AspNetUser_Target","entitySet":"AspNetUsers"}]},{"name":"FormDetail_AspNetUser","association":"Self.FormDetail_AspNetUser","end":[{"role":"FormDetail_AspNetUser_Source","entitySet":"FormDetails"},{"role":"FormDetail_AspNetUser_Target","entitySet":"AspNetUsers"}]},{"name":"FormDetail_Form","association":"Self.FormDetail_Form","end":[{"role":"FormDetail_Form_Source","entitySet":"FormDetails"},{"role":"FormDetail_Form_Target","entitySet":"Form"}]},{"name":"FormDetailsOption_FormDetails","association":"Self.FormDetailsOption_FormDetails","end":[{"role":"FormDetailsOption_FormDetails_Source","entitySet":"FormDetailsOptions"},{"role":"FormDetailsOption_FormDetails_Target","entitySet":"FormDetails"}]},{"name":"FormDetailsOptionDetail_FormDetailsOption","association":"Self.FormDetailsOptionDetail_FormDetailsOption","end":[{"role":"FormDetailsOptionDetail_FormDetailsOption_Source","entitySet":"FormDetailsOptionDetails"},{"role":"FormDetailsOptionDetail_FormDetailsOption_Target","entitySet":"FormDetailsOptions"}]},{"name":"FormDetailsType_FormDetails","association":"Self.FormDetailsType_FormDetails","end":[{"role":"FormDetailsType_FormDetails_Source","entitySet":"FormDetailsTypes"},{"role":"FormDetailsType_FormDetails_Target","entitySet":"FormDetails"}]},{"name":"ValueDetail_AspNetUser","association":"Self.ValueDetail_AspNetUser","end":[{"role":"ValueDetail_AspNetUser_Source","entitySet":"ValueDetails"},{"role":"ValueDetail_AspNetUser_Target","entitySet":"AspNetUsers"}]},{"name":"ValueDetail_FormDetail","association":"Self.ValueDetail_FormDetail","end":[{"role":"ValueDetail_FormDetail_Source","entitySet":"ValueDetails"},{"role":"ValueDetail_FormDetail_Target","entitySet":"FormDetails"}]},{"name":"AspNetUser_Forms","association":"Self.AspNetUser_Forms","end":[{"role":"AspNetUser_Forms_Source","entitySet":"AspNetUsers"},{"role":"AspNetUser_Forms_Target","entitySet":"Form"}]},{"name":"Value_AspNetUser","association":"Self.Value_AspNetUser","end":[{"role":"Value_AspNetUser_Source","entitySet":"Values"},{"role":"Value_AspNetUser_Target","entitySet":"AspNetUsers"}]},{"name":"Value_Form","association":"Self.Value_Form","end":[{"role":"Value_Form_Source","entitySet":"Values"},{"role":"Value_Form_Target","entitySet":"Form"}]}]}}}
);
