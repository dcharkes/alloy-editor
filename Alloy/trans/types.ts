module trans/types

imports

	src-gen/signatures/Alloy-sig
	types-manual

type rules // references

	Ref(e) : ty
	where definition of e : ty

	FieldRef(e, f): f-ty
	where definition of f : f-ty

type rules // expressions
	
	Int(n): Int()

	Card(e): Int()
	
	Lt (e1, neg, e2)
+	Gt (e1, neg, e2)
+	Lte(e1, neg, e2)
+	Gte(e1, neg, e2): Boolean()
	where	e1 : e1-ty
	  and e2 : e2-ty
	  and e1-ty => Int() else error ["Expected ", Int(), " got ", e1-ty] on e1
	  and e2-ty => Int() else error ["Expected ", Int(), " got ", e2-ty] on e2

type rules // declaration expressions should be booleans

	PredExpr(e):-
	where e : e-ty
	  and e-ty => Boolean() else error ["Expected ", Boolean(), " got ", e-ty] on e

relations // subtype

	define transitive <sub:

type rules // subtype

	SigDecl(a, [s], Some(Extends(super)), c, d) :-
  where super : super-ty
    and store s <sub: super-ty

type rules // union types

	RefUnion(a, b)
+	Union(a, b): ty
	where a : a-ty
	  and b : b-ty
	  and Union([a-ty, b-ty]) => ty

type rules // relation types

	Arrow(a, a-mul, b-mul, b): rel-ty
	where a : a-ty
	  and b : b-ty
	  and Rel([a-ty, b-ty]) => rel-ty

type rules